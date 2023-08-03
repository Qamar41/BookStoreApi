// src/books/dto/book-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { BookEntity } from '../book.entity';
import { UserEntity } from '../../user/user.entity'; // Replace with the actual path to UserEntity

export class BookResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  writer: UserEntity; // Change UserEntity to the actual type of the writer property

  @ApiProperty()
  price: number;

  @ApiProperty()
  coverImage: string;

  @ApiProperty()
  id: number;

  constructor(book: BookEntity) {
    this.title = book.title;
    // this.writer.fullName = book.writerUser.fullName; // Change writerUser to the actual property name in BookEntity
    this.price = book.price;
    this.coverImage = book.coverImage;
    this.id = book.id;
  }
}
