//* NESTJS
import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';

//* SERVICES
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  calculateSummary() {
    const allExpense = this.reportService.getAllInComeReport(
      ReportType.EXPENSE,
    );
    const allIncome = this.reportService.getAllInComeReport(ReportType.INCOME);
    const totalExpense = allExpense.reduce(
      (sum, report) => sum + report.amount,
      0,
    );

    const totalIncome = allIncome.reduce(
      (sum, report) => sum + report.amount,
      0,
    );
    return {
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
