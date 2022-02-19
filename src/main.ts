import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { author, name, version, description } from '../package.json';
import { HttpExceptionFilter } from 'exceptions/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: '*', // todo: add frontend url for production
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`[${author}]-${name}`.toUpperCase())
    .setDescription(description)
    .setVersion(version)
    .addTag('Documentation')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(Number(process.env.PORT) || 3001);
}
bootstrap();
