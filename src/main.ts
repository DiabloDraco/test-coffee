import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.HTTP_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.urlencoded({ extended: false }));

  app
    .setGlobalPrefix('api', {
      exclude: ['/images', '/images/:imageKey', '/images/get/:fileName'],
    })
    .useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: true,
      }),
    );

  const config = new DocumentBuilder()
    .setTitle('Coffee')
    .setDescription('The coffee API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port).then(() => {
    new Logger().log(port, 'Server Port');
  });
}
bootstrap();
