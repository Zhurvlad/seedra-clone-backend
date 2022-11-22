import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from './entities/item.entity';
import { SearchItemsDto } from './dto/search-items.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private repository: Repository<ItemEntity>,
  ) {
  }

  create(dto: CreateItemDto) {
    return this.repository.save(dto);
  }

  async findAll(): Promise<ItemEntity[]> {
    return this.repository.find({
      order: {
        id: 'asc'
      }
    });
  }



  async paginate(options: IPaginationOptions): Promise<Pagination<ItemEntity>> {
    const qb = this.repository.createQueryBuilder('item');
    qb.orderBy('item.id', 'ASC'); // Or whatever you need to do

  /*  const items = this.repository.find()*/
   /* const [meta, m] = await qb.getManyAndCount()
    console.log( this.repository.createQueryBuilder('item'))*/

    return paginate<ItemEntity>(qb, options);
  }

  async search(dto: SearchItemsDto){
    const qb = this.repository.createQueryBuilder('items')

    qb.limit(dto.limit || 0)
    qb.take(dto.take || 3)
    qb.orderBy('id', 'ASC')



    if (dto.type){
      qb.andWhere(`items.type ILIKE :type`)
    }

    if (dto.title){
      qb.andWhere(`items.title ILIKE :title`)
    }

    qb.setParameters({
      type: `%${dto.type}%`,
      title: `%${dto.title}%`
    })

    /*console.log(qb.getSql())*/

    const [items, totalCount] = await qb.getManyAndCount()

    return {items, totalCount}
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
