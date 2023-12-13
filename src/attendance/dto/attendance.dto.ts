import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Transform } from 'class-transformer';

export class AttendanceDto {
  @ApiPropertyOptional()
  @Transform((date) => Date)
  date: Date;
}

export class SearchAttendanceDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  date: Date;
}
