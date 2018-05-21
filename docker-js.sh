#!/bin/bash

mkdir -p dist/assets/js

npx babel src/ --out-file dist/assets/js/app.js --source-maps
