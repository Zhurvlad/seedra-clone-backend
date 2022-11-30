import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { USER_NOT_FOUND } from '../auth.constants';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'text',
    });
  }

  async validate(payload: {sub: number, email: string}) {
    const user = await this.usersService.findOne(payload.email)

    if (!user){
      throw  new UnauthorizedException(USER_NOT_FOUND)
    }

    return { id: payload.sub, email: payload.email };
  }
}