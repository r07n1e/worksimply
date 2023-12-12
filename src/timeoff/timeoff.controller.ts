import {
  Controller,
  UseGuards,
  Post,
  Patch,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { Roles, CurrentUser } from 'src/auth/decorator';
import { Role, User } from '@prisma/client';
import { TimeoffService } from './timeoff.service';

@ApiTags('Time-Off')
@Controller('timeoff')
@UseGuards(JwtGuard, RolesGuard)
export class TimeoffController {
  constructor(private TimeoffService: TimeoffService) {}

  @Post()
  requestTimeoff(dto, @CurrentUser() user: User) {}

  @Patch(':id')
  editTimeoff(@Param('id') id: number, dto, @CurrentUser() user: User) {}

  @Delete(':id')
  deleteTimeoff(@Param('id') id: number, @CurrentUser() user: User) {}

  @Get(':username')
  getTimeoffByUser(
    @Param('username') username: string,
    @CurrentUser() user: User,
  ) {}

  @Patch(':id')
  @Roles(['ADMIN'])
  approveTimeoff(@Param('id') id: number) {}

  @Get()
  @Roles(['ADMIN'])
  getAllTimeoff() {}
}
