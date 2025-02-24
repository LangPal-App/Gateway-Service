FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run test

FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY --from=builder ./app/src src
COPY --from=builder ./app/.env .env

CMD npm start