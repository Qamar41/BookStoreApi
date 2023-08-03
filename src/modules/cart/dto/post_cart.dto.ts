import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, IsInt } from 'class-validator';
import { Optional } from '@nestjs/common';
import { CartStatus } from '../../../constants/cart';

export class PostCartDto {
    @ApiProperty()
    @IsNumber()
    quantity: number;


    @ApiProperty()
    @IsInt()
    bookId : number

}
