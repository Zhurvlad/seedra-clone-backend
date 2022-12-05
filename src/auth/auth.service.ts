import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UNCORRECTED, USER_NOT_FOUND } from './auth.constants';
import {compare} from 'bcrypt'
import { UsersEntity } from '../users/entities/user.entity';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '../role/role.enum';


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

  generateJwtToken(data: {id: number, email: string}){
    const payload = {email: data.email, sub: data.id}
    return this.jwtService.sign(payload)
  }

  async register(dto: CreateUserDto) {
    try {
      //Точно указываем что мы ожидаем от фронтэнда
      const { password, roles, ...user } = await this.usersService.create({
        email: dto.email,
        fullName: dto.fullName,
        password: dto.password,
        roles: 'user'
      });
      return {
        ...user,
        token: this.generateJwtToken(user),
      };
    } catch (e) {
      throw new ForbiddenException( e);
    }
  }


  async registerAdmin(dto: CreateUserDto, role: string) {
    try {
      //Точно указываем что мы ожидаем от фронтэнда
      const { password, roles, ...user } = await this.usersService.create({
        email: dto.email,
        fullName: dto.fullName,
        password: dto.password,
        roles: role
      });

      return {
        ...user,
        token: this.generateJwtToken(user),
      };
    } catch (e) {
      throw new ForbiddenException('Произошла ошибка', e);
    }
  }

}
