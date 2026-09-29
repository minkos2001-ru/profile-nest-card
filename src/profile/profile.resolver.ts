import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { Skill } from './entities/skill.entity';
// import { CreateProfileInput } from './dto/create-profile.input';
// import { UpdateProfileInput } from './dto/update-profile.input';
// import { IntIdInput } from '../common/inputs/int-id.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { name: 'profile' })
  getProfile() {
    return this.profileService.get();
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: any) {
    return profile.skills.map((ps: any) => ps.skill);
  }

  // @Query(() => [Profile], { name: 'profiles' })
  // findAll() {
  //   return this.profileService.findAll();
  // }

  // @Mutation(() => Profile)
  // createProfile(@Args('input') input: CreateProfileInput) {
  //   return this.profileService.create(input);
  // }

  // @Mutation(() => Profile)
  // updateProfile(@Args('input') input: UpdateProfileInput) {
  //   return this.profileService.update(input.id, input);
  // }

  // @Mutation(() => Profile)
  // removeProfile(@Args('input') input: IntIdInput) {
  //   return this.profileService.remove(input.id);
  // }
}
