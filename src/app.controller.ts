import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    if (id < 1) {
      throw new BadRequestException('Id mus be greater 0');
    }
    return id;
    // return this.appService.getHello();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateDto) {
    return await this.appService.save(dto);
  }
}
