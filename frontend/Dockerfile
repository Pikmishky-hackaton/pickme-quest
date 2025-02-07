FROM node:alpine

WORKDIR /app/front

COPY . /app/front

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]