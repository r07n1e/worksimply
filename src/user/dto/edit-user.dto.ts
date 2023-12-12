import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserInfoDto {
  display_name?: string;
  first_name?: string;
  last_name?: string;
  description?: string;
}
