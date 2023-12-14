import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get('HOST', 'localhost');
  const port = configService.get('PORT', 3000);

  app.setGlobalPrefix('api');

  await app.listen(port, host, () => {
    console.log(`El servidor se esta ejecutando en http://${host}:${port}`);
  });
}

bootstrap();
