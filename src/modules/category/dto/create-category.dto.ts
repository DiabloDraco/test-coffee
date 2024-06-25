import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
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
