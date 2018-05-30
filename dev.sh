#!/bin/bash
mkdir -p dist/assets/js
mkdir -p dist/assets/css

trap 'echo "Bye!!!"; kill %1; kill %2; kill %3' SIGINT SIGKILL SIGQUIT

npx node-sass src/assets/css/main.scss --output dist/assets/css/main.css

bundle exec jekyll build --watch --config 'src/_config.yml,src/_config-common.yml,src/_config-development.yml' --source src/ --destination dist/ --incremental & npx babel src/ --out-file dist/assets/js/app.js --source-maps & npx node-sass --watch --recursive src/assets/css/main.scss --source-map-embed true --output dist/assets/css/main.css & npx browser-sync dist
