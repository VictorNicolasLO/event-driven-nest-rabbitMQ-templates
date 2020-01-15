import { Module, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMicroservices } from 'nest-rabbitmq-microservices';

@Module({
  imports: [
    RabbitMicroservices.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          exchanges: [],
          uri: config.get('RABBIT_HOST') || 'amqp://localhost:5672',
        };
      },
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
