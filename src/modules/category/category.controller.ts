import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';
import { Auth } from 'src/commons/decorators/auth.decorator';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @Auth()
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
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
    return this.categoryService.findAll({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiBearerAuth()
  @Auth()
  @Patch(':id')
  updatePartical(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.partialUpdate(+id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @Auth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
