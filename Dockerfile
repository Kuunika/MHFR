FROM node:10-alpine3.9
WORKDIR /app
COPY package.json ./
RUN npm install --only=prod
RUN npm install pm2 -g
COPY . .
CMD [ "pm2-runtime", "server/server.j" ]
