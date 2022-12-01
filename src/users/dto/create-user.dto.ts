import { IsEmail, IsString, Max, Min } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateUserDto {

  @IsString()
  readonly fullName: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
