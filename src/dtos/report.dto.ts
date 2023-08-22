//* LIBRARY
import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

//* Data
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional() // if decorator value can empty or not require in the object
  @IsNumber()
  @IsPositive() // Check number can must is  number positive ( Số Dương)
  amount: number;

  @IsOptional() // if decorator value can empty or not require in the object
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Exclude() // remove response
  created_at: Date;
  updated_at: Date;
  type: ReportType;

  @Expose({ name: 'createdAt' })
  transformCreateAt() {
    return this.created_at;
  }

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
