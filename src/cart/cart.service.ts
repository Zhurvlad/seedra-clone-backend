import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(@InjectRepository(CartEntity)
  private repository: Repository<CartEntity>
  ) {
  }

  /*async create(createCartDto: CreateCartDto, userId: number, itemsId: number) {

      const cart = await this.repository.save({
        itemsId: createCartDto.itemsId,
        count: createCartDto.quantity,
        imageUrl: createCartDto.imageUrl,
        title: createCartDto.title,
        price: createCartDto.price,
        user: { id: userId },
      /!*  items: { id: itemsId }*!/
      })

      return await this.repository.find(  {where:{ _id: cart._id}})
    }*/


  async addItemToCart(cartDTO: CreateCartDto, userId: number) {
    const {productId, quantity, price, title, imageUrl } = cartDTO;
    const subTotalPrice = quantity * Number(price);

    const cart = await this.getCart(userId);

    if (cart) {
      // @ts-ignore
      const itemIndex = cart.items.findIndex((item) => item.productId == productId);
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * Number(item.price);
        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        return this.repository.save(cart);
      } else {


        // @ts-ignore
        cart.items.push({ ...cartDTO, subTotalPrice });
        this.recalculateCart(cart);
        return this.repository.save(cart);
      }
    } else {
      return await this.createCart(userId, cartDTO, subTotalPrice, price);
    }
  }

  async createCart(userId: number, cartDTO: Omit<CreateCartDto, '_id'>, subtotalPrice: number, totalPrice: string) {
  return this.repository.save({
    user: {id: userId},
    items: [{ ...cartDTO, subtotalPrice }],
    totalPrice: Number(totalPrice)
  });

  }


  async deleteCart(userId: number) {
   return  await this.repository.delete({user: { id: userId }});
  }

  private recalculateCart(cart: CartEntity) {
    cart.totalPrice = 0;
    cart.items.forEach(item => {
      cart.totalPrice += (item.quantity * Number(item.price));
    })
  }

  async getCart(userId: number): Promise<CartEntity> {
    return await this.repository.findOneBy( {user: { id: userId }});
  }

  async removeItemFromCart(userId: number, productId: string): Promise<any> {
    const cart = await this.getCart(userId);

    // @ts-ignore
    const itemIndex = cart.items.findIndex((item) => item.productId == productId);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);

      this.recalculateCart(cart);
      return this.repository.save(cart)
    }
  }

 /* async plusItem(id: number, itemsId: number) {

    const find = await this.repository.findOne({ where: {itemsId: itemsId}}, );

    if (!find) {
      throw new NotFoundException('???????????? ???? ??????????????');
    }

    //?????????????????????? ?????????????????????? ???????????????????? ????????????
    await this.repository
      .createQueryBuilder('cart')
      .update()
      .set({
        quantity: () => 'quantity + 1',
      })
      .execute();

    //?????????? ?????????????? ?????????? ?????????? Post ?? user ?? ???????????? {relations: ["user"]}
    return this.repository.findOne({relations: ["user"], where: {itemsId: itemsId}}, );
  }

  async minusItem(itemsId: number){
    const find = await this.repository.findOne({ where: {itemsId: itemsId}}, );

    if (!find) {
      throw new NotFoundException('???????????? ???? ??????????????');
    }

    //?????????????????????? ?????????????????????? ???????????????????? ????????????
    await this.repository
      .createQueryBuilder('cart')
      .whereInIds(itemsId)
      .update()
      .set({
        quantity: () => 'quantity - 1',
      })
      .execute();

    //?????????? ?????????????? ?????????? ?????????? Post ?? user ?? ???????????? {relations: ["user"]}
    return this.repository.findOne({relations: ["user"], where: {itemsId: itemsId}}, );
  }*/


  delete(id: number) {
    return this.repository.delete(id);
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
