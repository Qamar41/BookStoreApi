
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
    ) { }

    async findAll() {
        const data = await this.tagRepository.find();
        return { tags: data }
    }

    async create(tagData: Partial<TagEntity>): Promise<TagEntity> {
        const tag = this.tagRepository.create(tagData);
        return this.tagRepository.save(tag);
    }
}
