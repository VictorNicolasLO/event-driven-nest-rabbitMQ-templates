import { Module, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersRepository } from './repositories/user.repository';
import { RabbitMicroservices } from 'nest-rabbitmq-microservices';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    RabbitMicroservices.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          exchanges: [
            {
              name: `service-rpc`,
              type: 'topic',
            },
            {
              name: `service`,
              type: 'topic',
            },
          ],
          uri: config.get('RABBIT_HOST') || 'amqp://localhost:5672',
        };
      },
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AppService, AppController, UsersRepository],
})
export class AppModule {}
