import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsString } from 'class-validator';
import { Role } from '../../role/role.enum';


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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({select: false})
  password: string;


  @Column({default: 'user'})
  roles: string
}
