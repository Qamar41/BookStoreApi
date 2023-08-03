import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrdersController } from './order.controller';
import { CartItemEntity } from '../cart/cartitem.entity';
import { CartEntity } from '../cart/cart.entity';




@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, CartItemEntity, CartEntity])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [],
    
})
export class OrdersModule { }