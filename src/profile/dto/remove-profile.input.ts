import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class RemoveProfileInput {
  @Field(() => Int, { description: 'Profile ID to delete' })
  @IsInt()
  @Min(1)
  id: number;
}
