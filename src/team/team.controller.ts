import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDto } from './dto';
import { CurrentUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';

@ApiTags('Team')
@UseGuards(JwtGuard, RolesGuard)
@Controller('team')
export class TeamController {
  constructor(private TeamService: TeamService) {}

  @Post()
  createTeam(@Body() dto: TeamDto, @CurrentUser() user: User) {
    return this.TeamService.createTeam(dto, user);
  }

  @Patch('join/:id')
  joinTeam(@Param('id') id: number, @CurrentUser() user: User) {
    return this.TeamService.joinTeam(id, user);
  }

  @Patch('update/:id')
  updateTeam(
    @Param('id') id: number,
    @Body() dto: TeamDto,
    @CurrentUser() user: User,
  ) {
    return this.TeamService.updateTeam(id, dto, user);
  }

  @Get()
  getTeams(@CurrentUser() user: User) {
    return this.TeamService.getTeams(user);
  }
}
