import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg({ pool });
const prisma = new PrismaClient({ adapter });

const PROFILE_ID = 1;

async function main() {
  // Profile
  const profile = await prisma.profile.upsert({
    where: { id: PROFILE_ID },
    update: {
      name: 'Минко Сергей Михайлович',
      description:
        'Fullstack-разработчик. TypeScript / Node.js / NestJS / React. Пишу диссертацию по ИИ.',
    },
    create: {
      id: PROFILE_ID,
      name: 'Минко Сергей Михайлович',
      description:
        'Fullstack-разработчик. TypeScript / Node.js / NestJS / React. Пишу диссертацию по ИИ.',
    },
  });

  // Links
  const socialLinks = [
    { source: 'GITHUB' as const, url: 'https://github.com/minkos2001-ru' },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.upsert({
      where: {
        source_profileId: { source: link.source, profileId: profile.id },
      },
      update: { url: link.url },
      create: { ...link, profileId: profile.id },
    });
  }

  // Skills
  const skillNames = [
    'TypeScript',
    'Node.js',
    'NestJS',
    'GraphQL',
    'Prisma',
    'PostgreSQL',
    'Docker',
    'React',
    'Python',
    'Git',
  ];

  for (const name of skillNames) {
    const skill = await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    await prisma.profileSkill.upsert({
      where: {
        profileId_skillId: { profileId: profile.id, skillId: skill.id },
      },
      update: {},
      create: { profileId: profile.id, skillId: skill.id },
    });
  }

  // Experience
  const experienceData = [
    {
      company: 'ООО "ИКС"',
      position: 'Fullstack-разработчик',
      startDate: new Date('2025-02-01'),
      endDate: null,
      achievements: [
        'Разработал торговый терминал',
        'Сделал приложение для бэкапа переписок в Telegram',
        'Писал Telegram-ботов',
        'Интегрировал Beorg и Sumsub в WordPress',
      ],
    },
    {
      company: 'Аспект',
      position: 'Инженер-программист III категории',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2025-02-01'),
      achievements: [
        'Разрабатывал фронтенд и бекенд workflow-редактора моделей ИИ',
        'Работал в рамках продукта наподобие 1С',
      ],
    },
    {
      company: 'ПКБ Монолит',
      position: 'Инженер-проектировщик III категории',
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-10-01'),
      achievements: [
        'Разрабатывал раздел «Сводный план инженерных сетей» для проектов реновации',
      ],
    },
  ];

  // Delete old experience data
  await prisma.experience.deleteMany({ where: { profileId: profile.id } });

  // Crete new experience
  await prisma.experience.createMany({
    data: experienceData.map((e) => ({ ...e, profileId: profile.id })),
  });

  // Projects
  const projectData = [
    {
      name: 'Profile Card API',
      url: 'https://github.com/SergeyM1nko/profile-card',
    },
    {
      name: 'Telegram Backup',
      url: 'https://github.com/SergeyM1nko',
    },
    {
      name: 'AI Workflow Editor',
      url: 'https://github.com/SergeyM1nko',
    },
  ];

  await prisma.project.deleteMany({ where: { profileId: profile.id } });

  await prisma.project.createMany({
    data: projectData.map((p) => ({ ...p, profileId: profile.id })),
  });
}

main()
  .then(() => console.log('✅ Seed completed'))
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
