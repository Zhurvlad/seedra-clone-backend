import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../role/role.enum';
import { RolesGuards } from '../role/guards/roles.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
	return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  @Get('/me')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuards)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    return req.user;
  }



  @Get()
  findAll() {
	return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuards)
  @Roles(Role.User)
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
