import { UserEntity } from './../user/user.entity';
// src/books/book.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { TagEntity } from './tag.entity';
import { CartEntity } from '../cart/cart.entity'
import { CartItemEntity } from '../cart/cartitem.entity';



@Entity()
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => UserEntity, (user) => user.books)
    writerUser: UserEntity;

    @Column()
    price: number;

    @Column()
    coverImage: string;

    @ManyToMany(() => TagEntity, (tag) => tag.books)
    @JoinTable()
    tags: TagEntity[];

    @OneToMany(() => CartItemEntity, item => item.book)
    cartItems: CartItemEntity[];
}
