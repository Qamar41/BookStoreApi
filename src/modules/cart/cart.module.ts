import { Module } from '@nestjs/common';
import { CartsService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { CartsController } from './cart.controller';
import { CartItemEntity } from './cartitem.entity';
import { BookEntity } from '../book/book.entity';

// import { TagEntity } from './tag.entity';


@Module({
    imports: [TypeOrmModule.forFeature([CartEntity, CartItemEntity, BookEntity])],
    controllers: [CartsController],
    providers: [CartsService],
    exports: [],
})
export class CartModule { }