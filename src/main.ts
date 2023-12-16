import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { UnprocessableEntityExceptionFilter } from './common/exception-filter/unprocessable-entity-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get('HOST', 'localhost');
  const port = configService.get('PORT', 3000);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        console.log('%O', errors);
        const mensajesErrores = {};

        errors.forEach((error) => {
          mensajesErrores[error.property] = Object.values(error.constraints);
        });

        return new UnprocessableEntityException(mensajesErrores);
      },
    }),
  );

  app.useGlobalFilters(new UnprocessableEntityExceptionFilter());

  await app.listen(port, host, () => {
    console.log(`El servidor se esta ejecutando en http://${host}:${port}`);
  });
}

bootstrap();
