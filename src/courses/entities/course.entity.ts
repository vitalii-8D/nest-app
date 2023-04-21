import { Course, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CourseEntity implements Course {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  topics: number[];
  @ApiProperty()
  @ApiProperty()
  students: User[];
  @ApiProperty()
  lector: User;
  @ApiProperty()
  lectorId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt: Date;
}
