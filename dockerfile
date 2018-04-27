FROM gregdaynes/project-hyde:latest

COPY ./Gemfile /opt/Gemfile
COPY ./Gemfile.lock /opt/Gemfile.lock
COPY ./docker-start.sh /opt/docker-start

RUN bundle --path vendor

COPY .git /opt/.git

CMD sh /opt/docker-start
