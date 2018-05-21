#!/usr/bin/env node

const { exec } = require('child_process');
const browserSync = require('browser-sync');
const chokidar = require('chokidar');

setupWatchers();
setupBrowserSync();

function setupWatchers() {
  console.log('Setting up watchers');

  function output(err, stdout, stderr) {
    if (err) return console.error(err, stderr);
    if (stdout) console.info(stdout)
  }

  const htmlWatcher = chokidar.watch(['src/**/*.html', 'src/**/*.yml']);
  const scssWatcher = chokidar.watch('src/assets/css/**/*.scss');
  const jsWatcher = chokidar.watch('src/assets/js/**/*.js');

  htmlWatcher.on('change', (event, path, details) => {
    console.info('Rebuilding HTML');
    exec('docker exec canswe sh ./docker-jekyll', output)
  });
  console.log('HTML Watcher');

  scssWatcher.on('change', (event, path, details) => {
    console.info('Rebuilding SCSS');
    exec('docker exec canswe sh ./docker-scss', output)
  });
  console.log('SCSS Watcher');

  jsWatcher.on('change', (event, path, details) => {
    console.info('Rebuilding JS');
    exec('docker exec canswe sh ./docker-js', output)
  });
  console.log('JS Watcher');
}

async function setupBrowserSync() {
  console.log('Setting up BrowserSync');
  browserSync({
    server: './dist',
    files: './dist'
  });
  console.log('BrowserSync ready');
}
