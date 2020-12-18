FROM node:latest

COPY . /opt/app

WORKDIR /opt/app

RUN npm i

RUN npm run build

EXPOSE 3000

CMD npm start