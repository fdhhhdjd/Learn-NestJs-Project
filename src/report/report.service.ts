//* NESTJS
import { Injectable } from '@nestjs/common';

//* LIBRARY
import { v4 as uuid } from 'uuid';

//* DATA
import { ReportType, data } from 'src/data';

//* DTOS
import { ReportResponseDto } from 'src/report/dtos/report.dto';

interface CreateReport {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  // Get All
  getAllInComeReport(type: ReportType): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report
      .filter((rp) => rp.type === reportType)
      .map((item) => new ReportResponseDto(item));
  }

  // Get Detail
  getDetailInComeReport(id: string, type: ReportType): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportDetail = data.report
      .filter((rp) => rp.type === reportType)
      .find((r) => r.id === id);

    if (!reportDetail) return;

    return new ReportResponseDto(reportDetail);
  }

  // Create
  createInComeReport(
    type: ReportType,
    { amount, source }: CreateReport,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    if (!newReport) return;

    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  // Update
  putInComeReport(
    type: ReportType,
    id: string,
    body: UpdateReport,
  ): ReportResponseDto {
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
    return new ReportResponseDto(data.report[reportIndex]);
  }

  // Delete
  deleteInComeReport(id: string) {
    const reportIndex = data.report.findIndex((rp) => rp.id === id);
    if (reportIndex === -1) return;

    return data.report.splice(reportIndex, 1);
  }
}
