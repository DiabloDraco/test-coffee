import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesRepository.save(
        this.categoriesRepository.create(createCategoryDto),
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(filter: FindManyOptions<Category>) {
    try {
      const [data, total] = await this.categoriesRepository.findAndCount(
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

  async findOne(id: number) {
    try {
      return await this.categoriesRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async partialUpdate(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoriesRepository.update(id, {
      ...category,
      ...updateCategoryDto,
    });
    return this.categoriesRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    try {
      return this.categoriesRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
