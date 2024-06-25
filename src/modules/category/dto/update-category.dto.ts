import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    description: 'Name of category',
    default: 'Category',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of category',
    default: 'Description',
  })
  @IsNotEmpty()
  description: string;
}
