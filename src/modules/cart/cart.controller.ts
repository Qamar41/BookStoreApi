import { Controller, Get, Post, Delete, Body, Param, HttpStatus, HttpCode, NotFoundException, } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CartsService } from './cart.service';
import { GetAllCartsDto } from './dto/carts.dto';
import { RoleType } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { CartEntity } from './cart.entity';
import { PostCartDto } from './dto/post_cart.dto';
import { UserEntity } from '../user/user.entity';
import { RemoveItemDto } from './dto/remove_item.dto';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Retrieve all carts',
    })
    async getAllCarts(): Promise<GetAllCartsDto> {
        const carts = await this.cartsService.findAll();
        return carts ;
    }

    @Post()
    @Auth([RoleType.USER])
    async createCart(@Body() postCartDto: PostCartDto, @AuthUser() user: UserEntity) {
        return this.cartsService.create(postCartDto, user);
    }

    @Delete()
    @Auth([RoleType.USER])
    async removeItem(@Body() body: RemoveItemDto, @AuthUser() user: UserEntity) {
        return this.cartsService.removeItem(body.cartId, body.itemId);
    }

    @Get('user')
    @Auth([RoleType.USER])
    async getUserCart(@AuthUser() user: UserEntity){
        return this.cartsService.getUsersCart(user)
    }
}
