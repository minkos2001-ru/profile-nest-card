import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from '../generated/prisma/client';
import {
  ProfileWhereInput,
  ProfileOrderByWithRelationInput,
} from '../generated/prisma/models';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async get() {
    const profile = await this.prismaService.profile.findFirst({
      include: {
        skills: { include: { skill: true } },
        experience: true,
        projects: true,
        socialLinks: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async create(dto: CreateProfileInput): Promise<Profile> {
    return this.prismaService.profile.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async findAll(params?: {
    where?: ProfileWhereInput;
    orderBy?: ProfileOrderByWithRelationInput;
    skip?: number;
    take?: number;
  }): Promise<Profile[]> {
    const { where, orderBy, skip, take } = params || {};
    return this.prismaService.profile.findMany({
      where,
      orderBy,
      skip,
      take,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }

  async remove(id: number): Promise<Profile> {
    return this.prismaService.profile.delete({
      where: {
        id: id,
      },
    });
  }
}
