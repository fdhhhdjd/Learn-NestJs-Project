//* NESTJS
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

//* APP
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Validate
  app.useGlobalPipes(
    new ValidationPipe({
      // if equal true Validate attribute Defined in Dto
      whitelist: true,

      // Auto convert data type Fit ( Phù hợp)
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(5000);
}
bootstrap();
