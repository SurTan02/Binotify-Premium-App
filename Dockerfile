FROM node:18-alpine

WORKDIR /usr/src/app

COPY *.json ./
COPY .env ./
COPY vite.config.ts ./
COPY index.html ./
COPY src/ src/
COPY public/ public/

RUN npm install

CMD ["npm", "run", "dev"]