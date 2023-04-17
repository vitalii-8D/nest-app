import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'Topic 1', default: 'Topic 1', required: true })
  name: string;
}
