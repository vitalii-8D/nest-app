import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTopicDto: CreateTopicDto) {
    return this.prisma.topic.create({ data: createTopicDto });
  }

  findAll() {
    return this.prisma.topic.findMany({});
  }

  findOne(id: number) {
    const topic = this.prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new NotFoundException('Topic not found');

    return topic;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    const topic = this.prisma.topic.update({
      where: { id },
      data: updateTopicDto,
    });
    if (!topic) throw new NotFoundException('Topic not found');

    return topic;
  }

  remove(id: number) {
    const topic = this.prisma.topic.delete({ where: { id } });
    if (!topic) throw new NotFoundException('Topic not found');

    return topic;
  }
}
