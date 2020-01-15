import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule);
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
