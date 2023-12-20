import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Work2Simply')
    .setDescription(
      'worksimply, ready to use APIs for HR managment. Includes all functions an HR might need.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.useStaticAssets(join(__dirname, '..', 'view/main/dist'));
  // app.useStaticAssets(join(__dirname, '..', 'view/admin/dist'), {
  //   prefix: '/admin/',
  // });
  await app.listen(3000);
}
bootstrap();
