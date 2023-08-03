// src/books/tag.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { BookEntity } from '../book/book.entity';

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => BookEntity, (book) => book.tags)
  @JoinTable()
  books: BookEntity[];
}
