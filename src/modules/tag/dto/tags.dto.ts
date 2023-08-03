// src/tags/dto/get-all-tags.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { TagEntity } from '../tag.entity';

export class GetAllTagsDto {
  @ApiProperty({ type: [TagEntity] })
  tags: TagEntity[];
}
