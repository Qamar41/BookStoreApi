// src/cart/cart.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from './../user/user.entity';
import { BookEntity } from '../book/book.entity';
import { CartStatus } from '../../constants/cart';
import { CartItemEntity } from './cartitem.entity';


@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItemEntity, item => item.cart)
  items: CartItemEntity[]; // Use an array to store the cart items

  @ManyToOne(() => UserEntity, user => user.cartItems)
  @JoinColumn({ name: 'owner' })
  owner: UserEntity;

  @Column()
  cartOwner: string;

  @Column({
    type: 'enum',
    enum: CartStatus, // Use the CartStatus enum
    default: CartStatus.PENDING, // Set a default status (optional)
  })
  status: CartStatus;

}
