import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { CurrentUser, Roles } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { UserProfileDto } from './dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get(':username')
  getMe(@Param('username') username: String, @CurrentUser() user: User) {
    if (username == user.username) return user;
    else return null;
  }

  @Get(':id')
  @Roles(['ADMIN'])
  getUserById(@Param('id') id: number) {}

  @Get('all-users')
  @Roles(['ADMIN'])
  getAllUsers() {
    return 'Yes';
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() userProfile: UserProfileDto,
    @CurrentUser() user: User,
  ) {
    return this.UserService.updateUser(id, userProfile, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number, @CurrentUser() user: User) {
    return this.UserService.deleteUser(id, user);
  }
}
