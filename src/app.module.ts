//* NESTJS
import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

//* APP
import { AppController } from './app.controller';
import { AppService } from './app.service';

//* CUSTOMS
// import { CustomInterceptor } from './custom.interceptor';
import { SummaryModule } from './summary/summary.module';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SummaryModule, ReportModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
      // useClass: CustomInterceptor,
    },
  ],
})
export class AppModule {}
