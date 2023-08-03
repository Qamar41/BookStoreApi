import { NotFoundException } from '@nestjs/common';

export class BookNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('book not found', error);
  }
}
