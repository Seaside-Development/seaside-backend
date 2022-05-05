#Dockerfile
# PROD CONFIG

FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm ci

COPY  . .

EXPOSE 8080

CMD ["npm", "start"]
#CMD ["node", "server.js"]