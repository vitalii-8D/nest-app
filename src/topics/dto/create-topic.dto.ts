import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Topic 1', default: 'Topic 1', required: true })
  name: string;
}
