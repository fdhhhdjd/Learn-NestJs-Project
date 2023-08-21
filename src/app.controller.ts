//* LIBRARY
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
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
  getAll(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): object {
    return this.appService.getAllInComeReport(type);
  }
  @Get(':id')
  getById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.getDetailInComeReport(id, type);
  }

  @Post('/create')
  create(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.appService.createInComeReport(type, { amount, source });
  }

  @Put(':id')
  update(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { amount: number; source: string },
  ) {
    return this.appService.putInComeReport(type, id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.appService.deleteInComeReport(id);
  }
}
