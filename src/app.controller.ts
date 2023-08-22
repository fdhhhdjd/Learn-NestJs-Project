//* NESTJS
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

//* DTOS
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';

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
  ): ReportResponseDto[] {
    return this.appService.getAllInComeReport(type);
  }

  @Get(':id')
  getById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.appService.getDetailInComeReport(id, type);
  }

  @Post('/create')
  create(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto {
    return this.appService.createInComeReport(type, { amount, source });
  }

  @Put(':id')
  update(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    return this.appService.putInComeReport(type, id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.appService.deleteInComeReport(id);
  }
}
