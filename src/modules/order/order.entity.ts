import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { UserEntity } from './../user/user.entity';
import { CartItemEntity } from '../cart/cartitem.entity';
import { OrderStatus } from '../../constants/order_status';


@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @OneToMany(() => CartItemEntity, item => item.order)
  items: CartItemEntity[]; // Use an array to store the ordered items

  @ManyToOne(() => UserEntity, user => user.orders)
  @JoinColumn({ name: 'customer' })
  customer: UserEntity;

  @Column()
  orderCustomer: string;

  @Column({ type: 'float' })
  total: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

}
