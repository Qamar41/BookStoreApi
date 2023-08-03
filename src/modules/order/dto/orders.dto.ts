// src/tags/dto/get-all-tags.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from '../order.entity';
export class GetAllOrdersDto {
  @ApiProperty({ type: [OrderEntity] })
  orders: OrderEntity[];
}
