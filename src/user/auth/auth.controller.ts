//* NESTJS
import { Controller, Post, Body } from '@nestjs/common';

//* AUTH
import { AuthService } from './auth.service';

//* DTOS
import { SigninDto, SignupDto } from 'src/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }
}
