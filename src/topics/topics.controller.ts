import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicEntity } from './entities/topic.entity';

@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @ApiCreatedResponse({ type: TopicEntity })
  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @ApiOkResponse({ type: TopicEntity, isArray: true })
  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @ApiOkResponse({ type: TopicEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.topicsService.findOne(+id);
  }

  @ApiOkResponse({ type: TopicEntity })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @ApiOkResponse({ type: TopicEntity })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.topicsService.remove(id);
  }
}
