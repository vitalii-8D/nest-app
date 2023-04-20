import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({
    minLength: 4,
    type: String,
    default: 'Jaiden.Klein@yahoo.com',
  })
  email: string;
  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4, type: String, default: 'pass' })
  password: string;
}
