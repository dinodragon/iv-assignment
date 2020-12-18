FROM node:latest

COPY . /opt/app

WORKDIR /opt/app

RUN npm i

RUN npm run build

EXPOSE 8080

# CMD npm start

CMD node ./build/server.js