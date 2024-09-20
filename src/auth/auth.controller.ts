import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ResponseDto } from './dto/response.dto';
import { UserDto } from './dto/user.dto';

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

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
