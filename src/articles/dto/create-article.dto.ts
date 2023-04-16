import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  published?: boolean;
}
