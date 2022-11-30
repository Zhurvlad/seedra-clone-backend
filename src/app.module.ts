import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { ItemEntity } from './items/entities/item.entity';
import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmService } from './modules/type-orm.service';

@Module({
  imports: [
		ConfigModule.forRoot(),
  	TypeOrmModule.forRootAsync({
			useClass : TypeOrmService
  }), ItemsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
