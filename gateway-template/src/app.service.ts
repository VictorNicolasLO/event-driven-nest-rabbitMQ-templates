import { Injectable } from '@nestjs/common';

import { BrokerService } from 'nest-rabbitmq-microservices';
// App core service
const WALLET_SERVICE = 'wallet';

@Injectable()
export class AppService {
  constructor(private readonly broker: BrokerService) {}
  async welcome(): Promise<any> {
    return await this.broker.send('wallet.welcome', { n: '1' });
  }
}
