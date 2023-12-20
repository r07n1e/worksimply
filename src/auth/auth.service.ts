import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, CreateUserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto) {
    // generate the password hash
    const password = await argon.hash(dto.password);

    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          password,
        },
      });

      const profile = await this.prisma.profile.create({
        data: {
          userId: user.id,
          bio: 'Empty Street',
        },
      });

      return this.signToken(user.id, user.email, user.username);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email or Username is Taken.');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ username: dto.username }, { email: dto.email }] },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.password, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email, user.username);
  }

  async signToken(
    userId: number,
    email: string,
    username: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      username,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '12h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
