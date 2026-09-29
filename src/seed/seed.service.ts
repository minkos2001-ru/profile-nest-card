import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);
  private readonly profileId = 1;

  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    const count = await this.prismaService.profile.count();
    if (count > 0) {
      this.logger.log('Seed skipped: profile already exists');
      return;
    }

    this.logger.log('Seeding database...');
    await this.createProfile();
    await this.createSocialLinks();
    await this.createSkills();
    await this.createExperience();
    await this.createProjects();
    this.logger.log('✅ Seed completed');
  }

  // ---------- Data ----------

  private getProfileData() {
    return {
      name: 'Минко Сергей Михайлович',
      description:
        'Fullstack-разработчик. TypeScript / Node.js / NestJS / React. Пишу диссертацию по ИИ.',
    };
  }

  private getSocialLinks() {
    return [
      { source: 'GITHUB' as const, url: 'https://github.com/minkos2001-ru' },
    ];
  }

  private getSkills() {
    return [
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
  }

  private getExperience() {
    return [
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
  }

  private getProjects() {
    return [
      {
        name: 'Profile Card API',
        url: 'https://github.com/SergeyM1nko/profile-card',
      },
    ];
  }

  // ---------- Logic ----------

  private async createProfile() {
    return this.prismaService.profile.upsert({
      where: { id: this.profileId },
      update: this.getProfileData(),
      create: this.getProfileData(),
    });
  }

  private async createSocialLinks() {
    const promises = this.getSocialLinks().map((link) =>
      this.prismaService.socialLink.upsert({
        where: {
          source_profileId: { source: link.source, profileId: this.profileId },
        },
        update: { url: link.url },
        create: { ...link, profileId: this.profileId },
      }),
    );

    return Promise.all(promises);
  }

  private async createSkills() {
    for (const name of this.getSkills()) {
      const skill = await this.prismaService.skill.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      await this.prismaService.profileSkill.upsert({
        where: {
          profileId_skillId: { profileId: this.profileId, skillId: skill.id },
        },
        update: {},
        create: { profileId: this.profileId, skillId: skill.id },
      });
    }
  }

  private async createExperience() {
    await this.prismaService.experience.deleteMany({
      where: { profileId: this.profileId },
    });

    await this.prismaService.experience.createMany({
      data: this.getExperience().map((e) => ({
        ...e,
        profileId: this.profileId,
      })),
    });
  }

  private async createProjects() {
    await this.prismaService.project.deleteMany({
      where: { profileId: this.profileId },
    });

    await this.prismaService.project.createMany({
      data: this.getProjects().map((p) => ({
        ...p,
        profileId: this.profileId,
      })),
    });
  }
}
