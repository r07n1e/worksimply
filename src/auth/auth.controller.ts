import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.AuthService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.AuthService.signin(dto);
  }

  @Post('signout')
  async logout(@Req() req, @Res() res: Response): Promise<void> {
    // Clear the token on the client side (assumes cookie-based storage)
    res.clearCookie('access_token');

    // You can also add additional logic here, such as marking the token as blacklisted
    // or managing a list of invalidated tokens on the server side if needed.

    res.status(200).send('You have successfully logged out.');
  }
}
