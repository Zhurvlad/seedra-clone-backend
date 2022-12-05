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
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
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

  @UsePipes(new ValidationPipe())
  @Post('register')
  register(@Body() dto: CreateUserDto){
    return this.authService.register(dto)
  }

  @UsePipes(new ValidationPipe())
  @Post('register/admin')
  registerAdmin(@Body() dto: CreateUserDto, role: string){
    return this.authService.registerAdmin(dto, role)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

