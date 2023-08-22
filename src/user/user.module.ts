//* NESTJS
import { Module } from '@nestjs/common';

//* PRISMA
import { PrismaModule } from 'src/prisma/prisma.module';

//* AUTH
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserModule {}
