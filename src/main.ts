import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Create doc config
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API')
    .setVersion('0.1')
    .build();

  // Crete Swagger module, bind it to the app
  const document = SwaggerModule.createDocument(app, config);
  // Mention the ednpoint where we want to serve docs
  SwaggerModule.setup('api', app, document);

  // Run app
  await app.listen(3000);
}
bootstrap();
