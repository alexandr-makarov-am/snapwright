FROM node:24-bookworm

WORKDIR /usr/src/app

COPY . .

RUN cp .env.example .env

RUN npm install
RUN npm run build

EXPOSE 4182

CMD ["npm", "run", "start:prod"]