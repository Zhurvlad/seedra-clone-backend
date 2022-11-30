import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UNCORRECTED, USER_NOT_FOUND } from './auth.constants';
import {compare} from 'bcrypt'
import { UsersEntity } from '../users/entities/user.entity';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService
              ) {}


  async validateUser(validateUser: LoginUserDto): Promise<Omit<UsersEntity, 'password' | 'hashPassword'>> {
    const user = await this.usersService.findOne(validateUser.email)

    if (!user){
     throw  new UnauthorizedException(USER_NOT_FOUND)
    }

    const isCorrectPassword = await compare(validateUser.password, user.password)

    if (!isCorrectPassword){
      throw  new UnauthorizedException(UNCORRECTED)
    }

    const {password, ...result} = user

    return result;
  }


  async login(user: UsersEntity) {
    const payload = { email: user.email, sub: user.id };
    const {password, ...result} = user
    return {
      ...result,
      access_token: this.jwtService.sign(payload),
    };
  }
}
