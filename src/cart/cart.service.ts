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

  async create(createCartDto: CreateCartDto, userId: number, itemsId: number) {

      const cart = await this.repository.save({
        itemsId: createCartDto.itemsId,
        count: createCartDto.count,
        imageUrl: createCartDto.imageUrl,
        title: createCartDto.title,
        price: createCartDto.price,
        user: { id: userId },
      /*  items: { id: itemsId }*/
      })

      return await this.repository.find(  {where:{ _id: cart._id}})
    }





  async plusItem(id: number, itemsId: number) {

    const find = await this.repository.findOne({ where: {itemsId: itemsId}}, );

    if (!find) {
      throw new NotFoundException('Статья не найдена');
    }

    //Инкрементим колличество просмотров статьи
    await this.repository
      .createQueryBuilder('cart')
      .update()
      .set({
        count: () => 'count + 1',
      })
      .execute();

    //Можно указать связь между Post и user с помощь {relations: ["user"]}
    return this.repository.findOne({relations: ["user"], where: {itemsId: itemsId}}, );
  }

  async minusItem(itemsId: number){
    const find = await this.repository.findOne({ where: {itemsId: itemsId}}, );

    if (!find) {
      throw new NotFoundException('Статья не найдена');
    }

    //Инкрементим колличество просмотров статьи
    await this.repository
      .createQueryBuilder('cart')
      .whereInIds(itemsId)
      .update()
      .set({
        count: () => 'count - 1',
      })
      .execute();

    //Можно указать связь между Post и user с помощь {relations: ["user"]}
    return this.repository.findOne({relations: ["user"], where: {itemsId: itemsId}}, );
  }


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
