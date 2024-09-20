import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { Gender } from '../enums/gender.enum';
import { UserRole } from '../enums/user-role.enum';

export class UserDto extends BaseDto {
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Phone number is invalid' })
  phoneNumber: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender?: Gender;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEnum(UserRole)
  role: UserRole;
}
