import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../users/entities/user.entity';
import { ItemEntity } from '../../items/entities/item.entity';


@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  itemsId: number;

  @Column()
  imageUrl: string;

  @Column()
  title: string;

  @Column()
  price: string;

  @Column()
  subtotalPrice: number

  @Column({default: 0})
  quantity: number

  @ManyToOne(() => UsersEntity, {eager: true} )
  @JoinColumn({ name: 'UserId' })
  user: UsersEntity;

  /*@ManyToOne(() => ItemEntity, { nullable: false, eager: true })
  @JoinColumn({ name: 'ItemsId' })
  items: ItemEntity;*/
}
