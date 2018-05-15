#!/bin/bash

bundle exec jekyll build --config 'src/_config.yml,src/_config-common.yml,src/_config-development.yml' --source src/ --destination dist/ --incremental
