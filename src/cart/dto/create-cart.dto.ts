import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../users/entities/user.entity';

export class CreateCartDto {
  @Column()
  imageUrl: string;

  @Column()
  title: string;

  @Column()
  price: string;

  @Column()
  count: number

}
