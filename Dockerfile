FROM node:21.5.0-alpine3.19

WORKDIR /usr/src/amigo-secreto-api

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
