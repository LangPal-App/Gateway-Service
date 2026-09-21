FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install

COPY . .
RUN npm run build

FROM node:24-bookworm-slim

WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["npm", "start"]