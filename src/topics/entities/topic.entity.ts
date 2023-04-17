import { Topic } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TopicEntity implements Topic {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ required: false, nullable: true })
  deleted: Date;
}
