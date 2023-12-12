import { Leave_Type } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class TimeoffDto {
  @IsEnum(Leave_Type)
  type: Leave_Type;

  timeoff_start: Date;

  timeoff_end: Date;
}
