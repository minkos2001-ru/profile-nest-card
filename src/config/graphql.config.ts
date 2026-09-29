import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

export async function getGraphQLConfig(): Promise<ApolloDriverConfig> {
  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // sortSchema: true,
  };
}
