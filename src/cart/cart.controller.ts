import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UserEmail } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { ItemsId } from '../decorators/items.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

 /* @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCartDto: CreateCartDto, @UserEmail() userId: number, @ItemsId() itemId: number ) {
    console.log(itemId)
    return this.cartService.create(createCartDto, userId, itemId);
  }*/

  @UseGuards(JwtAuthGuard)
  /*@Roles(Role.User)*/
  @Post('/create')
  async addItemToCart(@Request() req, @Body() cartDTO: CreateCartDto) {
    const userId = req.user.id;
    return await this.cartService.addItemToCart(cartDTO, userId);
  }

/*
  @UseGuards(JwtAuthGuard)
  @Post()
  addItemToCart(@Body() createCartDto: CreateCartDto, @UserEmail() userId: number, ) {
    return this.cartService.addItemToCart(createCartDto, userId );
  }*/

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.cartService.delete(+id);
  }

  @UseGuards(JwtAuthGuard)

  /*@Delete('/')
  async removeItemFromCart(@Request() req, @Body() { productId }) {
    const userId = req.user.userId;
    const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
  }
*/
  /*@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/:id')
  async deleteCart(@Param('id') userId: string) {
    const cart = await this.cartService.deleteCart(userId);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
*/
  /*@Patch('plus')
  @UseGuards(JwtAuthGuard)
  updatePlus(@Param('id') id: number, @ItemsId() itemId: number) {
    return this.cartService.plusItem(id, itemId);
  }

  @Patch('minus')
  @UseGuards(JwtAuthGuard)
  updateMinus(@ItemsId() itemId: number){
    return this.cartService.minusItem(itemId)
  }*/


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
