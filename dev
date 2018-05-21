#!/bin/bash

DEBUG='\033[1;30m'
NC='\033[0m'

################################################################################
# Welcome Banner

printf "\n\n"
printf "Welcome to Can-Swe\n"
printf "==================\n"

################################################################################
# Docker

# Detect docker socket running
docker=$(curl -s --unix-socket /var/run/docker.sock http://ping > /dev/null)
status=$?
if [ "$status" == "7" ]; then
  printf "Docker is not running\n"
  printf "Please start docker and try again\n"
  exit
fi

# Stop running containers
container=$(docker stop canswe &> /dev/null)
status=$?
if [ "$status" == "0" ]; then  # container was running
  printf "Old Can-Swe container stopped\n"
fi

# Look for image & build image
image=$(docker image inspect canswe &> /dev/null)
status=$?
if [ "$status" == "1" ]; then # no image found
  printf "Building Can-Swe image, please wait...\n"
  printf "${DEBUG}"
  docker build -t canswe .
  printf "${NC}"
fi

# Start up the container
printf "Starting new Can-Swe container\n"
container=$(docker run -d --rm -v $(pwd)/src:/opt/src -v $(pwd)/dist:/opt/dist --name canswe canswe sleep 3600)

################################################################################
# Local module dependencies

modules_folder=$(ls node_modules &> /dev/null)
status=$?
if [ "$status" == "1" ]; then # no directory
  printf "No modules found\n"
  mkdir node_modules
fi

# Chokidar
chokidar=$(ls node_modules | grep chokidar &> /dev/null)
status=$?
if [ "$status" == "1" ]; then # module not found
  printf "Installing chokidar"
  npm install chokidar --no-progress --no-save &> /dev/null
fi

# Browser-sync
browsersync=$(ls node_modules | grep browser-sync &> /dev/null)
status=$?
if [ "$status" == "1" ]; then # module not found
  printf "Installing browser-sync"
  npm install browser-sync --no-progress --no-save &> /dev/null
fi

################################################################################
# Run Preboot tasks

# build styles
docker exec canswe sh docker-scss

# build js
docker exec canswe sh docker-js

# build jekyll
docker exec canswe sh docker-jekyll

################################################################################
# Run watchers and browsersync

node start.js
