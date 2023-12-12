import { Transform } from 'class-transformer';

export class AttendanceDto {
  @Transform((date) => Date)
  date: Date;
}
