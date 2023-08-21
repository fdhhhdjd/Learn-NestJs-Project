//* LIBRARY
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

//* SERVICE
import { AppService } from './app.service';

//* DATA
import { ReportType } from './data';

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getAll(@Param('type') type: ReportType): object {
    return this.appService.getAllInComeReport(type);
  }
  @Get(':id')
  getById(
    @Param('type') type: ReportType,
    @Param('id', ParseIntPipe) id: string,
  ) {
    console.log(id, typeof id);
    return this.appService.getDetailInComeReport(id, type);
  }

  @Post('/create')
  create(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: ReportType,
  ) {
    return this.appService.createInComeReport(type, { amount, source });
  }

  @Put(':id')
  update(
    @Param('type') type: ReportType,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    return this.appService.putInComeReport(type, id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.appService.deleteInComeReport(id);
  }
}
