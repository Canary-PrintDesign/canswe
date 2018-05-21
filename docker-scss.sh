#!/bin/bash

mkdir -p dist/assets/css

npx node-sass src/assets/css/main.scss --source-map-embed true -s | npx postcss --use autoprefixer -b 'last 1 versions' -o /opt/dist/assets/css/main.css
