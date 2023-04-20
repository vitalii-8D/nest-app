import { ApiProperty } from '@nestjs/swagger';

export class TokenEntity {
  @ApiProperty()
  toked: string;
}
