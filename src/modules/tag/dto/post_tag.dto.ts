import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostTagDto {
    @ApiProperty()
    @IsString()
    name: string;
}
