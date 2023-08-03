// src/tags/tags.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse,  ApiTags} from '@nestjs/swagger';
import { TagsService } from './tag.service';
import { TagEntity } from './tag.entity';
import { GetAllTagsDto } from './dto/tags.dto';
import { PostTagDto } from './dto/post_tag.dto';
import { Auth, AuthUser } from '../../decorators';
import { RoleType } from '../../constants';
import { UserEntity } from '../user/user.entity';



@ApiTags('tags')
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Get()
    @ApiOkResponse({ description: 'Get all tags.' })
    async getAllTags(): Promise<GetAllTagsDto> {
        return this.tagsService.findAll();
    }

    @Post()
    @Auth([RoleType.USER])
    @ApiOkResponse({ description: 'Tags created successfully.' })
    async createTag(@Body() postTagDto: PostTagDto, @AuthUser() user: UserEntity): Promise<TagEntity> {
        return this.tagsService.create(postTagDto);
    }

}
