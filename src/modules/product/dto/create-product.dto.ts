import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of product',
    default: 'Product',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'price of Product',
    default: 1000,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'description of Product',
    default: 'description',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'categories of Product',
    type: String,
  })
  @IsNotEmpty()
  @Type(() => Category)
  category: Category;

  @ApiProperty({
    description: 'Photos of product',
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  photos: string[];
}
