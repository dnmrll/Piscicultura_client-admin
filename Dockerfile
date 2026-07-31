FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --no-freeze-lockfile || npm install

COPY . .

EXPOSE 3003

CMD ["pnpm", "run", "dev"]
