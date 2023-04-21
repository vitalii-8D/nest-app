import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'First Name', required: true })
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Last Name', required: true })
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'email@gmail.com', required: true })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password', required: true })
  password: string;
  @IsOptional()
  @IsEnum(UserRole)
  @ApiProperty({
    example: UserRole.STUDENT,
    default: UserRole.STUDENT,
    required: false,
  })
  role: UserRole = UserRole.STUDENT;
}
