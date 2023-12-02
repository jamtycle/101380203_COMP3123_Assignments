FROM node:20-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
