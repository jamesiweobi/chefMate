import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cookieConfig } from './config/cookie.config';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: [cookieConfig()],
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3030);
  console.log('server running on port: 3030');
}
bootstrap();
