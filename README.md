# Profile Card API

Backend-визитка на NestJS + GraphQL + Prisma + PostgreSQL.
Разработана как тестовое задание: GraphQL API, отдающее профиль
специалиста с навыками, опытом работы, проектами и ссылками.

## Стек

- **NestJS** — фреймворк
- **GraphQL** (Apollo Server) — API
- **Prisma 7** — ORM
- **PostgreSQL 16** — БД
- **Docker + Docker Compose** — запуск одной командой

## Быстрый запуск

\`\`\`bash
docker compose up --build
\`\`\`

Приложение поднимется на **http://localhost:3000/graphql** (Apollo Sandbox).

При первом запуске:

1. Применяются миграции Prisma (`prisma migrate deploy`).
2. Автоматически выполняется seed — БД заполняется данными профиля.

## Пример запроса

\`\`\`graphql
query {
profile {
name
description
socialLinks {
source
url
}
skills {
name
}
experience {
company
position
startDate
endDate
achievements
}
projects {
name
url
}
}
}
\`\`\`

## Переменные окружения

Создай \`.env\` в корне проекта:

\`\`\`env
POSTGRES_USER=root
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=nestjs-profile
POSTGRES_PORT=5433

DATABASE_URL="postgresql://root:password@localhost:5433/nestjs-profile?schema=public"

APP_PORT=3000
NODE_ENV=production
\`\`\`

## Локальная разработка (без Docker)

\`\`\`bash

# 1. Запустить только БД

docker compose up -d postgres

# 2. Установить зависимости

npm install

# 3. Применить миграции

npx prisma migrate deploy --config prisma7.config.ts

# 4. Запустить в watch-режиме

npm run start:dev
\`\`\`

## Структура

\`\`\`
src/
├── profile/ # GraphQL-резолвер, сервис, entities
├── prisma/ # PrismaService
├── seed/ # SeedService — автозаполнение БД
└── generated/prisma/ # Сгенерированный Prisma Client

prisma/
├── schema.prisma # Модели данных
└── migrations/ # История миграций
\`\`\`

## Модели данных

- **Profile** — визитка (имя, описание)
- **Skill** + **ProfileSkill** — many-to-many навыков
- **Experience** — опыт работы (компания, должность, период, достижения)
- **Project** — проекты (название, ссылка)
- **SocialLink** — ссылки на GitHub/LinkedIn/сайт

## Лицензия

MIT
