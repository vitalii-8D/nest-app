import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Oscar.Schaden@hotmail.com', required: false })
  email?: string;
}
