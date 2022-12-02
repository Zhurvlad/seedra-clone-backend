import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UserEmail } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { ItemsId } from '../decorators/items.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCartDto: CreateCartDto, @UserEmail() userId: number, @ItemsId() itemId: number ) {
    console.log(itemId)
    return this.cartService.create(createCartDto, userId, itemId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.cartService.delete(+id);
  }

  @Patch('plus')
  @UseGuards(JwtAuthGuard)
  updatePlus(@Param('id') id: number, @ItemsId() itemId: number) {
    return this.cartService.plusItem(id, itemId);
  }

  @Patch('minus')
  @UseGuards(JwtAuthGuard)
  updateMinus(@ItemsId() itemId: number){
    return this.cartService.minusItem(itemId)
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
