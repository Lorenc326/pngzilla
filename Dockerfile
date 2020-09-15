FROM node:11

RUN mkdir /app
WORKDIR /app

ADD package.json /app/package.json
RUN npm install

EXPOSE 3000

CMD npm start