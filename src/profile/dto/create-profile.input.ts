import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 300)
  description?: string;
}
