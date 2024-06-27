import { User } from 'src/commons/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

enum OrderStatus {
  NEW = 'NEW',
  IN_PROCESS = 'IN_PROCESS',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  compleated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({ default: OrderStatus.NEW })
  status: OrderStatus;
}
