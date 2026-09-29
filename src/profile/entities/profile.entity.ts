import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Skill } from './skill.entity';
import { Experience } from './experience.entity';
import { Project } from './project.entity';
import { SocialLink } from './social-link.entity';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experience: Experience[];

  @Field(() => [Project])
  projects: Project[];

  @Field(() => [SocialLink])
  socialLinks: SocialLink[];
}
