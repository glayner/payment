FROM node:12.16.2-alpine

EXPOSE 9000
EXPOSE 9229
RUN mkdir -p /usr/app/current
WORKDIR /usr/app/current

COPY package.json .

RUN yarn global add -g @adonisjs/cli --silent
RUN yarn global add -g pm2 --silent
RUN yarn install --silent

COPY . .
# CMD node server.js
#docker build -t api-node:v1 .
