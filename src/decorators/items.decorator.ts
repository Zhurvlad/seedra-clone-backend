import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntity } from '../users/entities/user.entity';
import { ItemEntity } from '../items/entities/item.entity';


export const ItemsId = createParamDecorator( (_:unknown, ctx: ExecutionContext): ItemEntity => {
  const request = ctx.switchToHttp().getRequest()
  return request.body.id
})