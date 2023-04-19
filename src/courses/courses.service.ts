import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  include = {
    topics: { select: { id: true, name: true } },
    lector: { select: { id: true, firstName: true, lastName: true } },
  };

  constructor(private readonly prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    const { topics } = createCourseDto;
    delete createCourseDto.topics;
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        topics: {
          connect: topics.map((topic) => ({ id: topic })),
        },
      },
      include: this.include,
    });
  }

  findAll() {
    return this.prisma.course.findMany({
      include: this.include,
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: this.include,
    });
    if (!course) throw new NotFoundException('Course not found');

    return course;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    const topics: number[] | undefined = updateCourseDto.topics;

    const updateObj = topics?.length
      ? {
          ...updateCourseDto,
          topics: { set: topics.map((topic) => ({ id: topic })) },
        }
      : { ...updateCourseDto, topics: undefined };

    return this.prisma.course.update({
      where: { id },
      data: updateObj,
      include: this.include,
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }
}
