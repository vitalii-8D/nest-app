import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MinLength(5)
  @ApiProperty({ default: 'Post Title 1' })
  title: string;

  @IsString()
  @MaxLength(300)
  @ApiProperty({ required: false, default: 'very long description' })
  description?: string;

  @IsString()
  @ApiProperty({ default: 'body body body body body body body' })
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  published?: boolean;
}
