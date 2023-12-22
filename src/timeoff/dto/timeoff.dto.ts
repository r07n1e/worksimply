import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Leave_Type, User } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class TimeoffDto {
  @ApiProperty()
  @IsEnum(Leave_Type)
  type: Leave_Type;

  @ApiProperty()
  @Transform((date) => Date)
  timeoff_start: Date;

  @ApiProperty()
  @Transform((date) => Date)
  timeoff_end: Date;

  @ApiPropertyOptional()
  description: string;

  duration: number;
}

export class SearchTimeoffDto {
  user: User;
  date: Date;
}

export class TimeoffApprovalDto {
  approval: Boolean;
}
