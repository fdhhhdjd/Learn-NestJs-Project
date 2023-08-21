import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportType, data } from './data';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  // Get All
  getAllInComeReport(type: ReportType) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const resultData: object = data.report.filter(
      (rp) => rp.type === reportType,
    );
    return resultData;
  }

  // Get Detail
  getDetailInComeReport(id: string, type: ReportType) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const resultData: object = data.report
      .filter((rp) => rp.type === reportType)
      .find((r) => r.id === id);
    return resultData;
  }

  // Create
  createInComeReport(
    type: ReportType,
    { amount, source }: { amount: number; source: string },
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);
    return data.report;
  }

  // Update
  putInComeReport(
    type: ReportType,
    id: string,
    body: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const resultDataUpdate: object = data.report
      .filter((rp) => rp.type === reportType)
      .find((r) => r.id === id);

    if (!resultDataUpdate) return;

    const reportIndex = data.report.findIndex((rp) => rp.id === id);

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };
    return data.report[reportIndex];
  }

  // Delete
  deleteInComeReport(id: string) {
    const reportIndex = data.report.findIndex((rp) => rp.id === id);
    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);
    return data.report;
  }
}
