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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/commons/decorators/auth.decorator';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';

@ApiTags('orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', example: '123456' },
        details: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              product: { type: 'string', example: '1' },
              count: { type: 'number', example: 2 },
            },
          },
        },
      },
    },
  })
  @Auth()
  @Post()
  create(@Body() body: any) {
    return this.orderService.create(body.user_id, body.details);
  }

  @Get()
  findAll(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
  ) {
    return this.orderService.findAll({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiBearerAuth()
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiBearerAuth()
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
