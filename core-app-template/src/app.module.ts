import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WelcomeService } from './microservices/welcome';
import { RabbitMicroservices } from 'nest-rabbitmq-microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMicroservices.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          exchanges: [
            {
              name: `wallet-app-rpc`,
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
  providers: [AppController, WelcomeService, ConfigService],
})
export class AppModule {}
