import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { BooksController } from './book.controller';
import { TagEntity } from './tag.entity';


@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, TagEntity])],
    controllers: [BooksController],
    providers: [BooksService],
    exports: [],
})
export class BookModule { }