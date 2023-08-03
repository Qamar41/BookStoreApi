// src/tags/dto/get-all-tags.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { CartEntity } from '../cart.entity';

export class GetAllCartsDto {
  @ApiProperty({ type: [CartEntity] })
  carts: CartEntity[];
}
