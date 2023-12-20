import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Leave_Type, User } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class TimeoffDto {
  @ApiProperty()
  @IsEnum(Leave_Type)
  type: Leave_Type;

  @ApiProperty()
  timeoff_start: Date;

  @ApiProperty()
  timeoff_end: Date;

  @ApiPropertyOptional()
  description: string;
}

export class SearchTimeoffDto {
  user: User;
  date: Date;
}

export class TimeoffApprovalDto {
  approval: Boolean;
}
