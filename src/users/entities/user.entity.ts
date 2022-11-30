import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  fullName: string;



  @BeforeInsert()
  async hashPassword() {
	this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({select: false})
  password: string;
}
