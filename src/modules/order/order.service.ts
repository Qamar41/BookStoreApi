// src/books/books.service.ts

import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, InsertResult } from 'typeorm';
import { OrderEntity } from './order.entity';
import { CartItemEntity } from '../cart/cartitem.entity';
import { BookEntity } from '../book/book.entity';
import { CartEntity } from '../cart/cart.entity';
import { BookNotFoundException } from '../../exceptions/book-not-found.exception'
import { UserEntity } from '../user/user.entity';
import { OrderStatus } from '../../constants/order_status';
import { CartStatus } from '../../constants/cart';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private ordersRepository: Repository<OrderEntity>,

        @InjectRepository(CartEntity)
        private readonly cartsRepository: Repository<CartEntity>,

        @InjectRepository(CartItemEntity)
        private readonly cartItemRepository: Repository<CartItemEntity>,

    ) { }

    async findAll() {
        const orders = await this.ordersRepository.find();
        console.log(orders);
        return {orders};
    }
    

    async calculateOrderTotal(cartItems: CartItemEntity[]): Promise<number> {
        let orderTotal = 0;
    
        for (const item of cartItems) {
          orderTotal += item.book.price * item.quantity;
        }
    
        return orderTotal;
      }
    
      async createOrderFromCart(user): Promise<{ orderId: Uuid; total: number }> {
        const userId = user.id
        const cart = await this.cartsRepository
          .createQueryBuilder('cart')
          .leftJoinAndSelect('cart.items', 'items')
          .leftJoinAndSelect('items.book', 'book')
          .where('cart.owner = :userId', { userId })
          .andWhere('cart.status = :status', { status: 'PENDING' })
          .getOne();

        console.log(cart)
    
        if (!cart) {
            throw new HttpException(`Cart not found for user with ID: ${userId}`, HttpStatus.BAD_REQUEST);
        }

    
        const orderTotal = await this.calculateOrderTotal(cart.items);
    
        // Create the order entity and save it to the database
        const order = new OrderEntity();
        order.items = cart.items;
        order.orderCustomer = userId;
        order.customer = user
        order.total = orderTotal;
        console.log(orderTotal)
    
        const savedOrder = await this.ordersRepository.save(order);
        cart.status = CartStatus.USED;
        await this.cartsRepository.save(cart)
    
        return {
          orderId: savedOrder.id,
          total: orderTotal,
        };
      }

    async cancelOrder(orderId: string): Promise<void> {
        const order = await this.ordersRepository
            .createQueryBuilder('order')
            .where('order.id = :orderId', {orderId})
            .getOne()
    
        if (!order) {
          throw new NotFoundException(`Order with ID ${orderId} not found.`);
        }
    
        if (order.status !== OrderStatus.PENDING) {
          throw new Error(`Order with ID ${orderId} cannot be canceled as it is not in PENDING status.`);
        }
    
        order.status = OrderStatus.CANCELLED
        await this.ordersRepository.save(order);
    }

    async listOrders(page: number, pageSize: number): Promise<OrderEntity[]> {
        const skip = (page - 1) * pageSize; // Calculate the number of items to skip based on the page and pageSize
    
        const orders = await this.ordersRepository.find({
          order: { createdAt: 'DESC' },
          skip,
          take: pageSize,
        });
    
        return orders;
      }
    

}
