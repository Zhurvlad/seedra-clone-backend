import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../users/entities/user.entity';
import { ProductEntity } from './product.entity';


@Entity('cart', )
export class CartEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @OneToOne(() => UsersEntity, {eager: true})
  @JoinColumn({name: 'userId'})
  user: UsersEntity;

  @Column({ nullable: true, type: 'jsonb'}, )
  items: ProductEntity[]

  @Column({default: 0})
  totalPrice: string


  @Column({default: 0})
  totalCount: number



}
