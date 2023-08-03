import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { CartStatus } from '../../../constants/cart';

export class RemoveItemDto {

    @ApiProperty()
    @IsString()
    cartId: string;

    @ApiProperty()
    @IsString()
    itemId : string

}
