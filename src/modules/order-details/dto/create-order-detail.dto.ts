import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';

export class CreateOrderDetailDto {
  @ApiProperty({
    description: 'product id',
    type: String,
  })
  product: Product;

  @ApiProperty({
    description: 'count of Product',
    type: Number,
  })
  count: number;

  @ApiProperty({
    description: 'id of order',
    type: String,
  })
  order: Order;
}
