FROM node:latest

RUN npm install -g bun

WORKDIR /server

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bunx prisma generate

ENV DATABASE_URL="mongodb://localhost:27017/ClassCompass"

EXPOSE 8393

CMD ["bun", "start"]