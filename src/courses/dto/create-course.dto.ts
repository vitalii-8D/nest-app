import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'Course 1', required: true })
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'Description', required: true })
  description: string;
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ example: [1], required: true })
  topics: number[];
}
