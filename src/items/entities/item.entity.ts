import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  title: string;

  @Column()
  price: string;

  @Column({nullable: true })
  type: string

}