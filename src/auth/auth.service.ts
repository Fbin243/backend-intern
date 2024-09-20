import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ResponseDto } from './dto/response.dto';
import { UserDto } from './dto/user.dto';
import { AccountStatus } from './enums/account-status.enum';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto): Promise<ResponseDto> {
    const {
      email,
      phoneNumber,
      password,
      fullName,
      gender,
      avatar,
      dateOfBirth,
      address,
      role,
    } = userDto;

    // Check if phone number or email exists
    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      throw new ConflictException('Email or phone number already exists');
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      email,
      phoneNumber,
      password: hashedPassword,
      fullName,
      gender,
      avatar,
      dateOfBirth,
      address,
      role,
      status: AccountStatus.Pending,
    });

    await this.usersRepository.save(user);
    return new ResponseDto('Sign up successfully', HttpStatus.CREATED);
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
    const { emailOrPhoneNumber, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({
      where: [
        { email: emailOrPhoneNumber },
        { phoneNumber: emailOrPhoneNumber },
      ],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        email: user.email,
      };
      const accessToken: string = await this.jwtService.sign(payload);

      return new ResponseDto('Login successfully.', HttpStatus.OK, {
        accessToken,
      });
    } else {
      throw new UnauthorizedException(
        'Login failed. Please check your login credentials.',
      );
    }
  }
}
