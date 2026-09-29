import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { SocialLinkSource } from '../../generated/prisma/enums';

registerEnumType(SocialLinkSource, {
  name: 'SocialLinkSource',
  description: 'Source of a social link',
});

@ObjectType()
export class SocialLink {
  @Field(() => SocialLinkSource)
  source: SocialLinkSource;

  @Field()
  url: string;
}
