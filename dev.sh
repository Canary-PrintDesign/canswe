#!/bin/bash
mkdir -p dist/assets/js
mkdir -p dist/assets/css

rm -rf dist/assets/js/*
rm -rf dist/assets/css/*

./node_modules/.bin/node-sass src/assets/css/main.scss --output dist/assets/css/
./node_modules/.bin/babel src/ --out-file dist/assets/js/app.js

trap 'echo "Bye!!!"; kill %1; kill %2; kill %3' SIGINT SIGKILL SIGQUIT

bundle exec jekyll build \
  --drafts \
  --watch \
  --config 'src/_config.yml,src/_config-common.yml,src/_config-development.yml' \
  --source src/ \
  --destination dist/ \
& ./node_modules/.bin/babel src/ \
   --watch \
   --out-file dist/assets/js/app.js \
   --source-maps \
& ./node_modules/.bin/node-sass \
  --watch \
  --recursive src/assets/css/main.scss \
  --source-map-embed true \
  --output dist/assets/css/ \
& ./node_modules/.bin/browser-sync dist -w  -f ./dist
