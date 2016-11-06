FROM node:6

COPY . /src/app
WORKDIR /src/app

ENV API_URL=http://todo-api.dlavieri.com

RUN npm install && \
  npm install -g bower && \
  bower install --allow-root && \
  npm run sass-build && \
  npm run prod

expose 80

CMD ["node", "server.js"]
