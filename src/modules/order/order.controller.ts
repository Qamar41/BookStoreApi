import { Controller, Get, Post, Delete, Body, Param, 
    Query, HttpStatus, ParseUUIDPipe,ParseIntPipe,
    HttpCode, NotFoundException, } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { CartsService } from './cart.service';
import { OrdersService } from './order.service';
import {GetAllOrdersDto} from './dto/orders.dto'
import { RoleType } from '../../constants/role-type';
import { Auth, AuthUser } from '../../decorators';
import { UserEntity } from '../user/user.entity';
import { Pagination } from '../../common/pagination.decorator';



@Controller('orders')
@ApiTags('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Retrieve all orders',
    })
    async getAllCarts(): Promise<GetAllOrdersDto> {
        const orders = await this.ordersService.findAll();
        return orders ;
    }

    @Get('list')
    async listOrders(@Pagination() pagination: { page: number; pageSize: number }) {
      const orders = await this.ordersService.listOrders(pagination.page, pagination.pageSize);
      return orders;
    }

    @Post()
    @Auth([RoleType.USER])
    async createOrder( @AuthUser() user: UserEntity) {
        
        const { orderId, total } = await this.ordersService.createOrderFromCart(user);

        return {
            orderId,
            total,
        };
    }

    @Delete(':id/cancel')
    async cancelOrder(@Param('id', ParseUUIDPipe) orderId: string) {
        await this.ordersService.cancelOrder(orderId);
        return { message: 'Order canceled successfully' };
    }
}
