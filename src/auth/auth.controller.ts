import {
  Controller,
  Request,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { JwtAuthGuard } from './guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Request() req) {
    return this.authService.login(req.user)
  }


  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() dto: CreateUserDto){
    return this.authService.register(dto)
  }


  @Post('register/admin')
  @UsePipes(new ValidationPipe())
  registerAdmin(@Body() dto: CreateUserDto, role: string){
    return this.authService.registerAdmin(dto, role)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

