import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { AccountStatus } from './enums/account-status.enum';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(userDto: UserDto): Promise<void> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
