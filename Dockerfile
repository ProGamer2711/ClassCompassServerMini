FROM node:latest

RUN npm install -g bun

WORKDIR /server

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bunx prisma generate

# Required for the bun to start
ENV DATABASE_URL="mongodb://localhost:27017/ClassCompass"
ENV REDIS_URL="redis://localhost:6379"

EXPOSE 8393

CMD ["bun", "start"]