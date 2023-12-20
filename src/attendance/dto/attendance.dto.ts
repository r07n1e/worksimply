import { ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class AttendanceDto {
  @ApiPropertyOptional()
  @Transform((date) => Date)
  date: Date;
}

export class SearchAttendanceDto {
  @ApiPropertyOptional()
  user: User;

  @ApiPropertyOptional()
  @IsOptional()
  date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  start_date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  end_date: Date;
}
