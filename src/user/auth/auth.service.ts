//* NESTJS
import { ConflictException, Injectable } from '@nestjs/common';

//* PRISMA
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaService } from 'src/prisma/prisma.service';

//* LIBRARY
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly PrismaService: PrismaService) {}
  async signup({ email, name, phone, password }: SignupParams) {
    const userExits = await this.PrismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userExits) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      email,
      phone,
      name,
      password: hashedPassword,
      user_type: UserType.BUYER,
    };
    const user = await this.PrismaService.user.create({ data });

    const token = await jwt.sign(
      {
        name,
        id: user.id,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 3600000,
      },
    );
    return token;
  }
}
