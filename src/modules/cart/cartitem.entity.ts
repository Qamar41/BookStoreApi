import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
import { BookEntity } from '../book/book.entity';
import { OrderEntity } from '../order/order.entity';

@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartEntity, cart => cart.items)
  @JoinColumn({ name: 'cartId' })
  cart: CartEntity;

  @ManyToOne(() => BookEntity, book => book.cartItems)
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;

  @Column()
  quantity: number;

  @ManyToOne(() => OrderEntity, order => order.items, { nullable: true }) // Inverse relation with OrderEntity
  order: OrderEntity | null; // A cart item may or may not belong to an order
}
