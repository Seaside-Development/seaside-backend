FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm ci

COPY  . .

ENV MONGO_URI=mongodb+srv://client:clientCapst0ne@capstonecluster.b1lzy.mongodb.net/Capstone?retryWrites=true&w=majority
ENV MONGO_PASS=clientCapst0ne
ENV MONGO_DB=Capstone
ENV MONGO_USER=client

EXPOSE 8080

CMD ["npm", "start"]
#CMD ["node", "server.js"]