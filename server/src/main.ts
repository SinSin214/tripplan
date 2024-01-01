import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.enableCors();

  await app.listen(process.env.PORT_SERVER);
}

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

bootstrap();
