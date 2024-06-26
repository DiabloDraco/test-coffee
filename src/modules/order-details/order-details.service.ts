import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailssRepository: Repository<OrderDetail>,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    try {
      return await this.orderDetailssRepository.save(
        this.orderDetailssRepository.create(createOrderDetailDto),
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(filter: FindManyOptions<OrderDetail>) {
    try {
      const [data, total] = await this.orderDetailssRepository.findAndCount(
        filter,
      );

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
      return this.orderDetailssRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    try {
      return this.orderDetailssRepository.update({ id }, updateOrderDetailDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  remove(id: number) {
    try {
      return this.orderDetailssRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
