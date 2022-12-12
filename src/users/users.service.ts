import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
	@InjectRepository(UsersEntity)
	private repository: Repository<UsersEntity>,
  ) {}


 async create(createUsersDto: CreateUserDto) {
   const newUser = new UsersEntity();
   Object.assign(newUser, createUsersDto);
   return this.repository.save(newUser);
  }

  async findOne(email: string) {
   const user = await this.repository.findOne({
     where: { email } ,
     select: ['email','fullName', 'id',]})

    /*const {password, ...result} = user*/
    return user
  }

  findAll() {
	return this.repository.find();
  }



  update(id: number, updateUserDto: UpdateUserDto) {
	return `This action updates a #${id} user`;
  }

  remove(id: number) {
	return `This action removes a #${id} user`;
  }
}
