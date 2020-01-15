import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { BrokerService, Rpc } from 'nest-rabbitmq-microservices';

const appName = 'planCatalogue';

@Injectable()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly broker: BrokerService,
  ) {}

  @Rpc(`${appName}.create`)
  async create(planDto) {
    const response = await this.appService.create(planDto);
    await this.broker.publish(`${appName}.created`, { req: planDto, response });
    return response;
  }
}
