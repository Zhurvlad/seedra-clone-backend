import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../users/entities/user.entity';


@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  title: string;

  @Column()
  price: string;

  @Column()
  count: number

  @ManyToOne(() => UsersEntity, {eager: true} )
  @JoinColumn({ name: 'UserId' })
  user: UsersEntity;
}
