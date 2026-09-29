import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.APP_PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Application: http://localhost:${port}/graphql`);
}
void bootstrap();
