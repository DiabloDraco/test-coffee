import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: Product;

  @Column()
  count: number;

  @ManyToOne(() => Order)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
  })
  order: Order;
}
