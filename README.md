CAN-SWE
======

Can-Swe manufactures quality outdoor work garments, protective apparel, rainwear, chainsaw chaps, and high-visibility garments.

Installing
----------

In your terminal

1) Clone the repo
```sh
git clone https://github.com/Canary-PrintDesign/canswe
```

2) Navigate into the project director
```sh
cd canswe
```

3) Run Docker
```sh
docker-compose up
```

You should now be able to see the Jekyll site running at `http://localhost:3000`

If this is the first time running the project, Docker will fetch the required base container, download and install all required Ruby Gems, and NPM modules for the project.

Subsequent calls to `docker-compose up` will use cached version of the containers, gems, and node modules, only needing to pull in changes (if any).

_Info: If you find there are errors running the project, you can try using the kill script, which will close any programs running on ports required for the project, as well as any current docker containers. Enter `./start` in your terminal_

When you're done with development, you can stop the container by pressing `Ctrl-C` in the Terminal window where you started docker

Project Structure
-----------------

The project uses Jekyll as it's foundation, therefore most of the common Jekyll ways to do things stand.

Site related code should be placed inside the `src` directory of the repo. If you have files that are part of the project, but are not used/included in the final site, create a new top level directory, and place those inside.

### _data

Is where you should put data files that are accessible to the entire site. Usually things like navigations, contact data, personell-profiles are good candidates.
More can be read on the [Jekyll Documentation Site](https://jekyllrb.com/docs/datafiles/)

### _includes

Jekyll has the concept of "partials" or snippets of code that can be reused in any file, these are placed inside the _includes directory.

Can-Swe has 4 sub directories.

- components: Complete html blocks, things like navs, headers, footers, as well as smaller componets of a site
- fragment: Incomplete, or just string based things, like copyright string that includes the site, or page title. These are usually combinations of Liquid tags to output a string, but does not have enough structure to warrant a component.
- head: Keeps partials for things that belong inside `<head></head>` tags. Things like links, opengraph, icons, `<title>`, prefetchers, and fonts importers
- html: Other higher level blocks of html that aren't usually included in more than one place

More can be read on the [Jekyll Documentation Site](https://jekyllrb.com/docs/includes/)

### _layouts

Page templates that can be nested to create different page layouts. Can-Swe starts with a single by default, which will be used on all pages.

Can-Swe also makes use of the [jekyll-default-layout](https://github.com/benbalter/jekyll-default-layout) which will attempt to find a layout based on the type of page

```
What layout is used:

/index.md - the home layout, the page layout, or the default layout, if they exist, in that order
A page - the page layout or the default layout, if they exist, in that order
A post - the post layout or the default layout, if they exist, in that order
```

### assets

- css: Site scss/css files go in here, broken down further into the _sass directory and it's child directories
- js: Javascript files for the site go in here, organization is less important than the css
- icons
- images

### pages

This is where you will place site specific pages, preferably defining permalinks in each pages front-matter, to give nicer urls.

### Configuration Files

Can-Swe's configurations are split up into three types.

- base: _config.yml - base level configurations are in here, these are things like, output directory; markdown parser; plugins used; It should be uncommon to alter this file.
- common: _config-common.yml - All of the sites configurations are done in here. You will add/update this file for most of the site changes.
- environment: _config-development.yml, _config-production.yml - Configurations specific to the environment in the name. You probably wont need to alter these much.

Build Automations
-----------------

Automation scripts, or "pipelines" are provided through npm scripts, which are more easily composed and customized than other common build tools like Webpack, Gulp, Grunt, Broccoli, etc.

They can be found in the scripts section of [package.json](package.json)

All automations can be run from the commandline using `npm run {script-name}`
eg: `npm run dev:jekyll`

### Development Automations

#### Start - `start`

Start is the simplest way to get started developing. It doesn't do any work itself, but calls pther named automations.

If you're running development through the Docker container, this is the script that gets run at the start, and controls the development builds.

It starts the following automations

- `dir:css`
- `dir:js`
- `dev:css`
- `dev:js`
- `dev:jekyll`
- `dev:browsersync`

Which you can find out more about below

#### PreCommit - `precommit`

Runs code linting scripts before you create a git commit, as to prevent bad or incorrectly formatted code from getting into the git repo.

#### PrePush - `prepush`

Like it's sibling `precommit`, `prepush` runs before a series of commits are pushed up to the repo.

#### Lint - `lint`

Runs linters for css and js against the current codebase. These linters will notify if it finds your css/scss/js does not conform to the rules of the project

Sub Scripts: `lint:css` `lint:js`

#### Dev:CSS - `dev:css`

Dev:CSS starts up node-sass watcher which looks for changes in the sass files associated with the project. When it detects a change, the file main.scss is transpiled using node-sass and output to the dist/assets/css directory. Once in assets, further processing is done on the file, like processing source maps, and adding vendor prefixes.

CSS sourcemaps are output to make tracing in the browser easier to manage.

#### Dev:JS - `dev:js`

Dev:JS starts up babel which watches the project's Javascript files for changes. Once a change is detected the JS files are transpiled through Babel. Here the modern ES variants are transpiled into browser ready ES5. Once transpiling is complete the js is output to dist/assets/js directory

JS is transpiled with sourcemaps, to make tracing in the browser easier to manage.

#### Dev:Jekyll - `dev:jekyll`

The core of the automations, this kicks off the Jekyll build, pulls in the base, common, and development configurations, and outputs the project to the /dist directory.

#### Dev:Browsersync - `dev:browsersync`

Browserync is the process that serves up the site on [localhost:3000](http://localhost:3000) (or wherever 0.0.0.0 gets bound on your host).

There is also a ui config for browsersync located at [localhost:3001](http://localhost:3001)

#### Build - `build`

The automation for creating a production ready version of the website. This automation runs the following sub scripts:

- `clean:js`
- `clean:css`
- `clean:maps`
- `build:jekyll`
- `build:css`
- `build:js`

#### Clean Automations

Cleaning automations should be used with caution. They will cause data loss to occur.

`clean:js` - Removes ALL existing files inside /dist/assets/js
`clean:css` - Removes ALL existing files inside /dist/assets/css
`clean:maps` - Removes ALL existing source map files from everywhere in /dist/assets

#### Capture - `capture`

Capture will crawl through the projects sitemap, and create screen shots of each page. Currently this is only at desktop resolutions.

Note: This will not work using the docker container

#### Doctor Jekyll - `doctor:jekyll`

An experimental script to diagnose a slow building jekyll process. If you find a page is taking a longer-than-normal time to build, this may help find the cause.

#### Other Automations

There are other scripts besides the ones listed above. These are mostly supplemental scripts to make the scripts above more modular. You should not have a reason to run these on their own.

License
-------

This project is licensed under the GNU GPL V3 - see the [LICENSE](LICENSE) file for details



#### Docker

Download the Docker CE application that matches your operating system.

[MacOS](https://store.docker.com/editions/community/docker-ce-desktop-mac)
• [Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)
• [Linux/Ubuntu](https://store.docker.com/editions/community/docker-ce-server-ubuntu)
• [Other OS](https://store.docker.com/search?offering=community&type=edition)
