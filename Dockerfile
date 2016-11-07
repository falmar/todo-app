FROM node:6

COPY . /src/app
WORKDIR /src/app

RUN npm install && \
  npm install -g bower && \
  bower install --allow-root && \
  npm run sass-build && \
  npm run prod && \
  rm -rf node_modules && \
  rm -rf bower_components

expose 80

CMD ["node", "server.js"]
