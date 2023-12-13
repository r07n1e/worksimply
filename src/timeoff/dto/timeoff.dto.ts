import { Leave_Type, User } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class TimeoffDto {
  @IsEnum(Leave_Type)
  type: Leave_Type;

  timeoff_start: Date;

  timeoff_end: Date;
}

export class SearchTimeoffDto {
  user: User;
  date: Date;
}
