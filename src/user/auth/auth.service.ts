//* NESTJS
import { ConflictException, Injectable, HttpException } from '@nestjs/common';

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

interface SigninParams {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(private readonly PrismaService: PrismaService) {}

  async signup(
    { email, name, phone, password }: SignupParams,
    userType: UserType,
  ) {
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
      user_type: userType,
    };
    const user = await this.PrismaService.user.create({ data });

    const token = await this.generateJWT(user.name, user.id);
    return token;
  }
  async signin({ email, password }: SigninParams) {
    const userExits = await this.PrismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExits) {
      throw new HttpException('Invalid credentials', 400);
    }

    const hashedPassword = await userExits.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    const token = await this.generateJWT(userExits.name, userExits.id);

    return token;
  }

  async generateJWT(name: string, id: number) {
    return await jwt.sign(
      {
        name,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 3600000,
      },
    );
  }

  generateProductKey(email: string, userType: UserType) {
    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

    return bcrypt.hash(string, 10);
  }

  async getProfile(id: number) {
    const userInfo = await this.PrismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!userInfo) {
      throw new HttpException('Invalid credentials', 400);
    }

    return userInfo;
  }
}
