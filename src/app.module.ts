import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './commons/user/users.module';
import { RolesModule } from './commons/role/roles.module';
import { AuthModule } from './commons/auth/auth.module';
import { Role } from './commons/role/entities/role.entity';
import { User } from './commons/user/entities/user.entity';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/entities/category.entity';
import { Order } from './modules/order/entities/order.entity';
import { Product } from './modules/product/entities/product.entity';

type Type = 'postgres';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as Type,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Role, Category, Order, Product],
      synchronize: true,
      poolSize: 20,
      useUTC: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    OrderModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
