#!/bin/bash

mkdir -p dist/assets/js
mkdir -p dist/assets/css

# Jekyll
bundle exec jekyll build --config 'src/_config.yml,src/_config-common.yml,src/_config-production.yml' --source src/ --destination dist/

# SCSS
npx node-sass src/assets/css/main.scss --source-map-root file://${PWD}/ --source-map-embed true -s | npx postcss --use autoprefixer -b 'last 1 versions' -s | npx postcss --use cssnano -s | npx exorcist dist/assets/css/main.css.map > dist/assets/css/main.css

# JS
npx babel src/ | npx uglifyjs -o dist/assets/js/app.js
