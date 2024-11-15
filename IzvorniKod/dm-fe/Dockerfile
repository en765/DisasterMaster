FROM node:23-alpine3.19

WORKDIR /src

ADD package*.json .

RUN npm install

ADD . .

RUN npm run build

CMD ["npm","run","start"]
