import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QueryUserDto } from './dto/query-user.dto';
import { HashService } from '../helpers/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hash.hashPassword(
      createUserDto.password,
    );
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll({ email }: QueryUserDto) {
    const query: QueryUserDto = {};
    if (email) query.email = email;

    return this.prisma.user.findMany({ where: query });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  enterCourse(userId: number, courseId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        course: {
          connect: { id: courseId },
        },
      },
    });
  }
}
