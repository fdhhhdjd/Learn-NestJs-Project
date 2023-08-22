//* NESTJS
import { Module } from '@nestjs/common';

//* CONTROLLERS
import { ReportController } from './report.controller';

//* SERVICES
import { ReportService } from './report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
