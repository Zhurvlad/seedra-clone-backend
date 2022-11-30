import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt,strategy';

@Module({
  imports: [UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({
      secret: 'text',
      signOptions: {expiresIn: '30d'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService,  LocalStrategy, JwtStrategy]
})
export class AuthModule {}
