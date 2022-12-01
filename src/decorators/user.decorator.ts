import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntity } from '../users/entities/user.entity';


export const UserEmail = createParamDecorator( (_:unknown, ctx: ExecutionContext): UsersEntity => {
  const request = ctx.switchToHttp().getRequest()
  return request.user.id
})