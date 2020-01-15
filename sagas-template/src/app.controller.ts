import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Subscribe } from 'nest-rabbitmq-microservices';
const welcomeServiceName = 'welcome';
const appName = 'sagas';
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Subscribe(`${appName}.${welcomeServiceName}.welcome`)
  updatePlan(data) {
    this.appService.updateSomething(data);
  }
}
