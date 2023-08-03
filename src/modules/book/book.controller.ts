// src/books/books.controller.ts

import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, NotFoundException, } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './book.service';
import { BookEntity } from './book.entity';
import { BookResponseDto } from './dto/books.dto';
import { PostBookDto } from './dto/post_book.dto';
import { AssignTagsDto } from './dto/assignTag.dto';
import { RoleType } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { UserEntity } from '../user/user.entity';

@Controller('books')
@ApiTags('Book')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Retrieve all books',
    })
    async getAllBooks() {
        const books = await this.booksService.findAll();
        return { books };
    }

    @Get(':id')
    async getBook(@Param('id') id: number){
        const book = this.booksService.findOneBook(id);
        return book
    }

    @Post()
    @Auth([RoleType.USER])
    async createBook(@Body() postBookDto: PostBookDto, @AuthUser() user: UserEntity): Promise<BookEntity> {
        return this.booksService.create(postBookDto, user); // Pass the tagIds from the request body
    }

    @Post('tags/assign')
    @Auth([RoleType.USER])
    @ApiOkResponse({ description: 'Tags assigned successfully.' })
    @ApiNotFoundResponse({ description: 'Book not found.' })
    async assignTagsToBook(@Body() assignTagsDto: AssignTagsDto, @AuthUser() user: UserEntity):Promise<{ message: string }>{
        const bookId = assignTagsDto.bookId
        const tagIds =  assignTagsDto.tagIds
        const response = await this.booksService.assignTagsToOneBook(bookId, tagIds);
        return response
    }
}
