import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.listen(3002);

  console.log('🚀 Migration service running on http://localhost:3002');
}
bootstrap();
