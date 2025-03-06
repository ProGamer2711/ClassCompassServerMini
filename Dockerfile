FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 8393

CMD ["npm", "run", "start:prod"]