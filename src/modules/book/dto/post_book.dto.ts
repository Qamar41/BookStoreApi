import { ApiProperty } from '@nestjs/swagger';
import { TagEntity } from '../tag.entity';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class PostBookDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    coverImage: string;
}
