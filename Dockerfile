# build
FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy?schema=public" npx prisma generate
RUN npm run build

# runtime
FROM node:24-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma7.config.ts ./prisma7.config.ts

CMD ["node", "dist/main.js"]