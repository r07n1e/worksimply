import {
  Controller,
  UseGuards,
  Post,
  Patch,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { Roles, CurrentUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { TimeoffService } from './timeoff.service';
import { SearchTimeoffDto, TimeoffApprovalDto, TimeoffDto } from './dto';

@ApiTags('Time-Off')
@Controller('timeoff')
@UseGuards(JwtGuard, RolesGuard)
export class TimeoffController {
  constructor(private TimeoffService: TimeoffService) {}

  @Post()
  requestTimeoff(@Body() dto: TimeoffDto, @CurrentUser() user: User) {
    return this.TimeoffService.requestTimeoff(dto, user);
  }

  @Patch(':id')
  editTimeoff(
    @Param('id') id: number,
    @Body() dto: TimeoffDto,
    @CurrentUser() user: User,
  ) {
    return this.TimeoffService.editTimeoff(id, dto, user);
  }

  @Delete(':id')
  deleteTimeoff(@Param('id') id: number, @CurrentUser() user: User) {
    return this.TimeoffService.deleteTimeoff(id, user);
  }

  @Get(':username')
  getTimeoffByUser(
    @Param('username') username: string,
    @CurrentUser() user: User,
    @Body() dto: TimeoffDto,
  ) {
    return this.TimeoffService.getTimeoffByUser(username, user);
  }

  @Patch(':id')
  @Roles(['ADMIN'])
  approveTimeoff(@Param('id') id: number, @Body() dto: TimeoffApprovalDto) {
    return this.TimeoffService.approveTimeoff(id, dto);
  }

  @Get()
  @Roles(['ADMIN'])
  getAllTimeoff(@Body() dto: SearchTimeoffDto) {
    return this.TimeoffService.getAllTimeoff(dto);
  }
}
