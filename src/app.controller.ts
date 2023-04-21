import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('healthcheck')
@Controller()
export class AppController {
  @Get('health-check')
  getHello(): string {
    return 'Hello World!';
  }
}
