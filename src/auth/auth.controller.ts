import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.AuthService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.AuthService.signin(dto);
  }
}
