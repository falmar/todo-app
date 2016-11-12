FROM node:6

COPY . /src/app
WORKDIR /src/app

ENV API_URL=http://todo-api.dlavieri.com PORT=80

RUN npm install && \
  npm install -g bower && \
  bower install --allow-root && \
  npm run sass-build && \
  npm run prod && \
  rm -rf bower_components && \
  npm prune --production

expose 80

CMD ["node", "server.js"]
