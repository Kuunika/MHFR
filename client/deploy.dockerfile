FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --only=production
COPY ./ ./
RUN npm run build


FROM nginx:1.19.7-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g", "daemon off;"]
