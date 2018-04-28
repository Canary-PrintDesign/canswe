FROM gregdaynes/project-hyde:latest

COPY ./Gemfile /opt/Gemfile
COPY ./Gemfile.lock /opt/Gemfile.lock
COPY ./docker-start.sh /opt/docker-start

RUN bundle --path vendor

# APK Cleanup

RUN rm -rf /root/src /tmp/* /usr/share/man /var/cache/apk/* \
 && apk del build-base ruby-dev libxml2-dev \
 && apk search --update

COPY .git /opt/.git

CMD sh /opt/docker-start
