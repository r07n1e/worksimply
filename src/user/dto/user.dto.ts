import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserProfileDto {
  display_name?: string;
  first_name?: string;
  last_name?: string;
  description?: string;
}

export class SearchUserDto {}
