import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  emailOrPhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
