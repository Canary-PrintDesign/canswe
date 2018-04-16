FROM gregdaynes/project-hyde:latest

COPY ./Gemfile /opt/Gemfile
COPY ./Gemfile.lock /opt/Gemfile.lock
RUN bundle --path vendor

COPY ./package.json /opt/package.json
COPY ./yarn.lock /opt/yarn.lock
RUN yarn install

COPY .git /opt/.git

CMD npm start
