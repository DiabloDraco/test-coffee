import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';
import { Auth } from 'src/commons/decorators/auth.decorator';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @Auth()
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'per_page',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @Get()
  findAll(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
  ) {
    return this.productService.findAll({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiBearerAuth()
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiBearerAuth()
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
