FROM node:24-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM node:20.0.0-alpine as production

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]