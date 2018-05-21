FROM gregdaynes/project-hyde:latest

COPY ./Gemfile /opt/Gemfile
COPY ./Gemfile.lock /opt/Gemfile.lock
RUN bundle --path vendor

COPY ./node_modules.json /opt/package.json
RUN npm install

# APK Cleanup
RUN rm -rf /root/src /tmp/* /usr/share/man /var/cache/apk/* \
 && apk del build-base ruby-dev libxml2-dev \
 && apk search --update

COPY ./docker-jekyll.sh /opt/docker-jekyll
COPY ./docker-scss.sh /opt/docker-scss
COPY ./docker-js.sh /opt/docker-js

COPY ./build-production.sh /opt/build-production
