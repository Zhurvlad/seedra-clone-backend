import { Injectable } from '@nestjs/common';
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

  async create(createCartDto: CreateCartDto, id: number) {

  const cart = await this.repository.save({
     count: createCartDto.count,
     imageUrl: createCartDto.imageUrl,
     title: createCartDto.title,
     price: createCartDto.price,
    user:  {id: id}
   })


    return await this.repository.find(  {where:{ id: cart.id}})
  }

  findAll() {
    return `This action returns all cart`;
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
