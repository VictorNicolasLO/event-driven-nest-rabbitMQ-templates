import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMicroservices } from 'nest-rabbitmq-microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMicroservices.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          exchanges: [
            {
              name: `sagas-rpc`,
              type: 'topic',
            },
            {
              name: `sagas`,
              type: 'topic',
            },
          ],
          uri: config.get('RABBIT_HOST') || 'amqp://localhost:5672',
        };
      },
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
    }),
  ],

  providers: [AppService, AppController],
})
export class AppModule {}
