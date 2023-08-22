//* NESTJS
import { Module } from '@nestjs/common';

//* SUMMARY
import { SummaryController } from './summary.controller';

//* SERVICES
import { SummaryService } from './summary.service';
import { ReportService } from 'src/report/report.service';
import { ReportModule } from 'src/report/report.module';

@Module({
  imports: [ReportModule],
  controllers: [SummaryController],
  providers: [SummaryService, ReportService],
})
export class SummaryModule {}
