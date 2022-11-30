import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
	return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
	return this.usersService.findAll();
  }

  @Get('find')
  findOne(@Body() dto: LoginUserDto) {
	return this.usersService.findOne(dto.email);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	return this.usersService.update(+id, updateUserDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
	return this.usersService.remove(+id);
  }
}
