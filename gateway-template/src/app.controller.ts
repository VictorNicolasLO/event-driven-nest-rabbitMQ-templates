import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/welcome')
  login(@Body() user): Promise<any> {
    return this.appService.welcome();
  }
}
