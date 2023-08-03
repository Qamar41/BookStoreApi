import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, ArrayMinSize, ArrayNotEmpty, IsString } from 'class-validator';

export class AssignTagsDto {
  @ApiProperty()
  @IsInt()
  bookId: number;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  tagIds: number[];
}