FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN mkdir -p uploads

CMD ["node", "app.js"]
