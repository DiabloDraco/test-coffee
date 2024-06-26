import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './create-order-detail.dto';
import { Product } from 'src/modules/product/entities/product.entity';
import { Order } from 'src/modules/order/entities/order.entity';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
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
