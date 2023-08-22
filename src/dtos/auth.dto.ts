//* LIBRARY
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(
    /^\d{10,}$|^(\+\d{1,2}\s?)?((\d{3})\s?|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/,
    {
      message: 'Phone must be a valid phone number',
    },
  )
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
