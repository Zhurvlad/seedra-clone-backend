import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UserEmail } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { ItemsId } from '../decorators/items.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../role/role.enum';
import { RolesGuards } from '../role/guards/roles.guards';

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
  @Roles(Role.User)
  @Post('/create')
  async addItemToCart(@Request() req, @Body() cartDTO: CreateCartDto) {
    const userId = req.user.id;
    return await this.cartService.addItemToCart(cartDTO, userId);
  }

  @UseGuards(JwtAuthGuard)
 /* @Roles(Role.User)*/
  @Get()
  async getCart(@Request() req) {
    const userId = req.user.id;
    return this.cartService.getCart(userId);
  }




/*
  @UseGuards(JwtAuthGuard)
  @Post()
  addItemToCart(@Body() createCartDto: CreateCartDto, @UserEmail() userId: number, ) {
    return this.cartService.addItemToCart(createCartDto, userId );
  }*/


  @UseGuards(JwtAuthGuard)
  @Delete('clear')
  async delete(@Request() req ) {
    const userId = req.user.id;
    return this.cartService.deleteCart(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  @Delete('remove/:id')
  async removeItemFromCart(@Request() req, @Param('id') productId:string ) {
    const userId = req.user.id;
    const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
  }
  /*@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/:id')
  async deleteCart(@Param('id') userId: string) {
    const cart = await this.cartService.deleteCart(userId);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
*/
  @Patch('plus/:id')
  @UseGuards(JwtAuthGuard)
  updatePlus(@Request() req, @Param('id') productId:string) {
    const userId = req.user.id;
    return this.cartService.plusItem(userId, productId);
  }

  @Patch('minus/:id')
  @UseGuards(JwtAuthGuard)
  updateMinus(@Request() req, @Param('id') productId:string){
    const userId = req.user.id;
    return this.cartService.minusItem(userId, productId)
  }

 /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }*/
}
