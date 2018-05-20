#!/usr/bin/env node

const { exec, execSync } = require('child_process');
let m = [];
let p = [];

(async function init() {
  console.info("\n\nWelcome to Can-Swe");
  console.info("------------------");

  console.log('Checking dependencies');

  m['chokidar'] = await installModule('chokidar');
  m['browser-sync'] = await installModule('browser-sync');

  console.log('Dependencies installed');

  await dockerCleanup();
  setupWatchers();
  setupBrowserSync();

  return console.log('Ready!')
})();

async function dockerCleanup() {
  await dockerKillContainer();
  await dockerStartContainer();
}

function dockerKillContainer() {
  console.log('Killing old container');

  return new Promise((resolve, reject) => {
    exec('docker stop canswe', (err, stdout, stderr) => {
      resolve();
    });
  });
}

function dockerStartContainer() {
  console.log('Starting new container');

  return new Promise((resolve, reject) => {
    exec(`docker run -d --rm -v ${process.cwd()}/src:/opt/src -v ${process.cwd()}/dist:/opt/dist --name canswe canswe sleep 3600`, (err, stdout, stderr) => {
      if (err) throw(err);
      resolve();
    })
  });
}

async function setupWatchers() {
  console.log('Setting up watchers');

  function output(err, stdout, stderr) {
    if (err) return console.error(err, stderr);
    if (stdout) console.info(stdout)
  }

  const htmlWatcher = m['chokidar'].watch(['src/**/*.html', 'src/**/*.yml']);
  const scssWatcher = m['chokidar'].watch('src/assets/css/**/*.scss');
  const jsWatcher = m['chokidar'].watch('src/assets/js/**/*.js');

  p['html'] = htmlWatcher.on('change', (event, path, details) => {
    console.info('Rebuilding HTML');
    exec('docker exec test sh ./docker-jekyll', output)
  });
  console.log('HTML Watcher');

  p['scss'] = scssWatcher.on('change', (event, path, details) => {
    console.info('Rebuilding SCSS');
    exec('docker exec test sh ./docker-scss', output)
  });
  console.log('SCSS Watcher');

  p['js'] = jsWatcher.on('change', (event, path, details) => {
    console.info('Rebuilding JS');
    exec('docker exec test sh ./docker-js', output)
  });
  console.log('JS Watcher');
}

async function setupBrowserSync() {
  console.log('Setting up BrowserSync');
  m['browser-sync']({
    server: './dist',
    files: './dist'
  });
  console.log('BrowserSync ready');
}

function installModule(package) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`Looking for ${package}`);
      resolve(require(package))
    }
    catch(e) {
      console.log(`${package} not found`);
      console.log(`Installing ${package}`);

      exec(`npm install ${package} --no-progress --no-save`, (err, stdout, stderr) => {
        if (err) throw(stderr);

        console.log(`${package} installed`);

        resolve(require(package));
      });
    }
  });
}
