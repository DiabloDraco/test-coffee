import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderDetail } from '../order-details/entities/order-detail.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private orderDetailsService: OrderDetailsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, orderDetails: OrderDetail[]) {
    const order = await this.ordersRepository.save(
      this.ordersRepository.create(createOrderDto),
    );

    for (let i = 0; i < orderDetails.length; i++) {
      orderDetails[i].order = order;
      this.orderDetailsService.create(orderDetails[i]);
    }

    return order;
  }

  async findAll(filter: FindManyOptions<Order>) {
    try {
      const [data, total] = await this.ordersRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findOne(id: number) {
    try {
      return this.ordersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      return this.ordersRepository.update({ id }, updateOrderDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  remove(id: number) {
    try {
      return this.ordersRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
