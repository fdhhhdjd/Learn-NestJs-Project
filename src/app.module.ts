//* NESTJS
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

//* APP
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { CustomInterceptor } from './custom.interceptor';
//* SUMMARY
import { SummaryModule } from './summary/summary.module';

//* REPORT
import { ReportModule } from './report/report.module';

//* HOME
import { HomeModule } from './home/home.module';

//* USER
import { UserModule } from './user/user.module';
import { UserInterceptor } from './user/interceptors/user.interceptor';

//* PRISMA
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SummaryModule, ReportModule, UserModule, PrismaModule, HomeModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      // useClass: ClassSerializerInterceptor,
      useClass: UserInterceptor,
    },
  ],
})
export class AppModule {}
