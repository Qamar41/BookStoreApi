import { NotFoundException } from '@nestjs/common';

export class TagNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.tagNotFound', error);
  }
}
