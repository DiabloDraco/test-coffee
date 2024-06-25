import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      console.log(this.productsRepository.create(createProductDto));

      return await this.productsRepository.save(
        this.productsRepository.create(createProductDto),
      );
    } catch (error) {
      console.log(error);

      throw new BadRequestException();
    }
  }

  async findAll(filter: FindManyOptions<Product>) {
    try {
      const [data, total] = await this.productsRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.productsRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: number, updateProductrDto: UpdateProductDto) {
    try {
      return await this.productsRepository.update(id, updateProductrDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      return await this.productsRepository.delete({
        id,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
