FROM node:20.12.0-slim

WORKDIR /usr/src/app

COPY  ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","run","dev" ]