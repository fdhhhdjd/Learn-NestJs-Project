//* NESTJS
import { Controller, Get } from '@nestjs/common';

//* SERVICE
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('tai')
  getHello(): string {
    return this.appService.getHello();
  }
}
