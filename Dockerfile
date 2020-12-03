FROM node:10-alpine3.9
WORKDIR /app
COPY . .
RUN cd /app && npm i --only=prod && cd ./client/ && npm i --only=prod
RUN apk upgrade && apk add bash
RUN npm i -g serve