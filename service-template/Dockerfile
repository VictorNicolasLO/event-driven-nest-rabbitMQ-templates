FROM node:10

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3100

CMD ["npm", "run", "start:prod"]