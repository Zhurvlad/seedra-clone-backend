

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../users/entities/user.entity';
import { ItemEntity } from '../../items/entities/item.entity';


@Entity('product', )
export class ProductEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @OneToOne(() => ItemEntity, {eager: true})
  @JoinColumn({name: 'productId'})
  items: UsersEntity;

 /* @Column()
  productId: number*/

  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  subTotalPrice: number

  @Column({default: 0})
  quantity: number


}
