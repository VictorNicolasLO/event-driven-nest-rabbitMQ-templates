import { Injectable } from '@nestjs/common';
import { Rpc, BrokerService } from 'nest-rabbitmq-microservices';
const appName = 'wallet';
@Injectable()
export class AppController {
  constructor(private broker: BrokerService) {}

  @Rpc(`${appName}.welcome`)
  async welcome(data): Promise<any> {
    const result = { hello: 'welcome All' };
    this.broker.publish(`${appName}.welcomed`, {
      req: data,
      res: result,
    });
    return result;
  }
}
