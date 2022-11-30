import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/user.entity';
import { ItemEntity } from '../items/entities/item.entity';


@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {


  public createTypeOrmOptions(): TypeOrmModuleOptions {
    let options: TypeOrmModuleOptions = {
      database: process.env.DATABASE_NAME,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' && true,
      migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true' && true,
      logging: process.env.DATABASE_LOGGING === 'true' && true,
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      migrations: [
        __dirname + '/migrations/**/*{.ts,.js}',
      ],
    };

    if (process.env.DATABASE_TYPE === 'postgres') {
      options = Object.assign(options, {
        type: 'postgres',
       /* url: process.env.DATABASE_URL,*/
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        acquireTimeout: process.env.DATABASE_TIMEOUT,
      });
    } else {
      throw new InternalServerErrorException('Não há um outro tipo de banco de dados suportado, por favor, altere para MySQL o valor de DB_TYPE.');
    }

    return options;
  }



}