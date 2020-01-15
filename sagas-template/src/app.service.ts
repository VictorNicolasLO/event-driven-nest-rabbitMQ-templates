import { Injectable, Inject } from '@nestjs/common';
import { BrokerService } from 'nest-rabbitmq-microservices';

const TARGET_SERVICE = 'investPerformance';
@Injectable()
export class AppService {
  constructor(private readonly broker: BrokerService) {}
  updateSomething(data) {
    this.broker.send(`${TARGET_SERVICE}.updateSomething`, data.request);
  }
}
