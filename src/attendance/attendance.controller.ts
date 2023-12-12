import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { AttendanceService } from './attendance.service';
import { CurrentUser, Roles } from 'src/auth/decorator';
import { User } from '@prisma/client';

@ApiTags('Attendance')
@UseGuards(JwtGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private AttendanceService: AttendanceService) {}

  @Post('timein')
  timeIn(@CurrentUser() user: User) {
    return this.AttendanceService.timeIn(user);
  }

  @Patch('timeout')
  timeOut(@CurrentUser() user: User) {
    return this.AttendanceService.timeOut(user);
  }

  @Get(':username')
  getAttendanceByUser(
    @Param('username') username: string,
    @CurrentUser() user: User,
    @Body() dto,
  ) {
    return this.AttendanceService.getAttendanceByUser(username, user, dto);
  }

  @Get()
  @Roles(['ADMIN'])
  getAllAttendances() {}
}
