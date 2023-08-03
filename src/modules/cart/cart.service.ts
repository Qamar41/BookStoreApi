// src/books/books.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, InsertResult } from 'typeorm';
import { CartEntity } from './cart.entity';
import { CartItemEntity } from './cartitem.entity';
import { BookEntity } from '../book/book.entity';
import { BookNotFoundException } from '../../exceptions/book-not-found.exception'
import { RoleType } from '../../constants/role-type';
// import { TagEntity } from '../tag/tag.entity';
// import { BookResponseDto } from './dto/books.dto';

@Injectable()
export class CartsService {
    constructor(
        @InjectRepository(CartEntity)
        private cartsRepository: Repository<CartEntity>,

        @InjectRepository(CartItemEntity)
        private cartsItemsRepository: Repository<CartItemEntity>,

        @InjectRepository(BookEntity)
        private booksRepository: Repository<BookEntity>,
    ) { }

    async findAll() {
        const carts = await this.cartsRepository.find({
            relations: ['owner']
        });
        console.log(carts);
        return {carts};
    }
    

    async create(cartData , user) {
        const cartOwner = user.id;
        const bookId = cartData['bookId'];
        const quantity = cartData['quantity']
        
        const existingCart = await this.cartsRepository
            .createQueryBuilder('cart')
            .leftJoinAndSelect('cart.items', 'items')
            .where('cart.owner = :cartOwner', { cartOwner })
            .andWhere('cart.status = :status', { status: 'PENDING' })
            .getOne();

        console.log(existingCart)
      
        if (existingCart) {
            // Cart already exists for the user, add the book to the existing cart and save it
            const book = await this.booksRepository
                .createQueryBuilder('book')
                .where('book.id = :bookId', {bookId})
                .getOne()
            console.log(book)
            if(!book){
                throw new BookNotFoundException()
            }
            const cartItem = this.cartsItemsRepository.create({ cart: existingCart, book: { id: bookId }, quantity: quantity });
            existingCart.items = [...existingCart.items, cartItem];
            await this.cartsItemsRepository.save(cartItem);
            await this.cartsRepository.save(existingCart);
            return {message: "item added to the existing cart successfuly"}
        } else {
          // Cart does not exist for the user, create a new cart and add the book to it
            const newCart = this.cartsRepository.create({ owner: user, cartOwner: cartOwner });
            await this.cartsRepository.save(newCart); // Save the new cart
            const cartItem = this.cartsItemsRepository.create({ cart: newCart, book: { id: bookId }, quantity: quantity });
            await this.cartsItemsRepository.save(cartItem); // Save the cartItem
            return {message: "item added to the cart successfuly"}
        }
      }

    async removeItem(cartId: string, itemId: string) {
        const cart = await this.cartsRepository
          .createQueryBuilder('cart')
          .leftJoinAndSelect('cart.items', 'items')
          .where('cart.id = :cartId', { cartId })
          .getOne();
    
        if (!cart) {
          throw new NotFoundException('Cart not found');
        }
        const itemIdNumber = parseInt(itemId, 10);
        // Find the item with the provided itemId in the cart's items array
        const item = cart.items.find((item) => item.id === itemIdNumber);
    
        if (!item) {
          throw new NotFoundException('Cart item not found');
        }
    
        // Remove the item from the cart items array using a separate query
        await this.cartsItemsRepository
          .createQueryBuilder()
          .delete()
          .from(CartItemEntity)
          .where('id = :itemId', { itemId })
          .execute();
    
        return { message: 'Cart item removed' };
    }

    async getUsersCart(user){
        console.log("getUsersCart")
        console.log(user.id)
        const userId = user.id
        const cart = await this.cartsRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.items', 'cartItems')
        .leftJoinAndSelect('cart.owner', 'owner')
        .leftJoinAndSelect('cartItems.book', 'book')
        .where('cart.owner = :userId', { userId })
        .andWhere('cart.status = :status', { status: 'PENDING' })
        .getMany();
        console.log(cart)
        return { 
                message: `Cart found related to the user`,
                data: cart 
            }

    }

    

}
