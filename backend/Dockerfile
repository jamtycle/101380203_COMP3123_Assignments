FROM node:20-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3010

CMD npm start
