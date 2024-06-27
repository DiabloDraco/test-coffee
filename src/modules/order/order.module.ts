import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { OrderDetailsService } from '../order-details/order-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  controllers: [OrderController],
  providers: [OrderService, OrderDetailsService],
})
export class OrderModule {}
