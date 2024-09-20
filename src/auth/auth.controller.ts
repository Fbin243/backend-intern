import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ResponseDto } from './dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('api/v1/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userDto: UserDto): Promise<ResponseDto> {
    return this.authService.signUp(userDto);
  }

  @Post('/login')
  login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
    return this.authService.login(authCredentialsDto);
  }

  @Post('/verify/:userId')
  verifyAccount(@Param('userId') userId: string): Promise<ResponseDto> {
    return this.authService.verifyByEmail(userId);
  }

  @Put('/')
  @UseGuards(AuthGuard())
  async editProfile(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto> {
    const user: User = req.user;
    if (!user) throw new BadRequestException();

    return await this.authService.updateProfile(user.id, updateUserDto);
  }

  // Just for convenient testing
  @Get('/')
  getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }
}
