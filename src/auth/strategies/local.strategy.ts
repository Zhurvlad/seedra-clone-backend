import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import validate = WebAssembly.validate;
import { UsersEntity } from '../../users/entities/user.entity';
import { LoginUserDto } from '../../users/dto/login-user.dto';
import { UNCORRECTED, USER_NOT_FOUND } from '../auth.constants';
import {compare} from 'bcrypt'
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authService: AuthService) {
    super({usernameField: 'email', passwordField: 'password'});
  }

  async validate(email: string, password: string): Promise<any> {
    return  await this.authService.validateUser({email, password})
  }
}

