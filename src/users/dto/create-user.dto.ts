import { IsEmail, IsString, Max, Min } from 'class-validator';
import { IsNull } from 'typeorm';
import { Role } from '../../role/role.enum';

export class CreateUserDto {

  @IsString()
  readonly fullName: string;

  @IsString()
  @IsEmail(undefined,{message: 'Enter the correct email address'})
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly roles?: string
}
