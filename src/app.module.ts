import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { ItemEntity } from './items/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456qaZ',
    database: 'seedra',
    entities: [ItemEntity],
    synchronize: false,

  }), ItemsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
