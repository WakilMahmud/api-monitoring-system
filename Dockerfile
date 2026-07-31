FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

# RUN npm install --production
RUN npm install

COPY . .

RUN mkdir -p logs

EXPOSE 5000

CMD [ "node", "--watch", "src/server.js" ]