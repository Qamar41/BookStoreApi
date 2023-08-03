// src/books/books.service.ts

import { Injectable, NotFoundException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, InsertResult } from 'typeorm';
import { BookEntity } from './book.entity';
import { TagEntity } from './tag.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BookEntity)
        private bookRepository: Repository<BookEntity>,
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
    ) { }

    async findAll() {
        const books = await this.bookRepository.find({ 
            relations: ['writerUser']
        });
        return books;
    }

    async findOneBook(bookId : number){
        const book = await this.bookRepository
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.tags', 'tags')
        .leftJoinAndSelect('book.writerUser', 'user')
        .where('book.id = :bookId', {bookId})
        .getOne()

        if (!book) {
            throw new NotFoundException(`Book with ID ${bookId} not found.`);
        }

        return book

    }
    

    async create(bookData: Partial<BookEntity>, user): Promise<BookEntity> {
        const writerUser = user.id
        const book = this.bookRepository.create({ ...bookData, writerUser });
        console.log(book)
        return this.bookRepository.save(book);
    }


    async assignTagsToOneBook(bookId: number, tagIds: number[]){
        const book = await this.findOneBook(bookId)

        if (!book) {
          throw new NotFoundException(`Book with ID ${bookId} not found.`);
        }

        const title = book.title

        const tags = await this.tagRepository.find({
          where: { id: In(tagIds) }
        });

        if (tags.length !== tagIds.length) {
          throw new NotFoundException('One or more tagIds are not valid.');
        }

        // check if the tag is already assigned to the book
        book.tags.forEach((tag) => {
            const id = tag.id
            if (tagIds.includes(id)) {
                throw new HttpException('One or more of these tags are already assigned to this book.', HttpStatus.BAD_REQUEST);
            }
        })
    
        // Prepare the data to be inserted into the tag_entity_books_book_entity table
        const insertData = tagIds.map((tagId) => ({
          tag_entity_id: tagId,
          book_entity_id: bookId,
        }));

    
        await this.bookRepository
        .createQueryBuilder()
        .from('tag_entity_books_book_entity', "tags")
        .insert()
        .values(insertData)
        .execute();

        return {
            message: `tag/tags added to book: (${title}) successfully`
        }
    }

    
}
