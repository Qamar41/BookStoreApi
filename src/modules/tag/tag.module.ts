import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { TagsService } from './tag.service';
import { TagsController } from './tag.controller';




@Module({
    imports: [TypeOrmModule.forFeature([TagEntity])],
    controllers: [TagsController],
    providers: [TagsService],
    exports: [],
})
export class TagModule { }