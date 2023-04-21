import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CourseEntity } from './entities/course.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AUTH_ROLES } from '../auth/constants/role-keys.constant';
import { Roles } from '../auth/decorators/role.decorator';

@Roles(AUTH_ROLES.ALL)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(AUTH_ROLES.ADMIN)
  @ApiCreatedResponse({ type: CourseEntity })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @ApiOkResponse({ type: CourseEntity, isArray: true })
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @ApiOkResponse({ type: CourseEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Roles(AUTH_ROLES.ADMIN, AUTH_ROLES.LECTOR)
  @ApiOkResponse({ type: CourseEntity })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Roles(AUTH_ROLES.ADMIN)
  @ApiOkResponse({ type: CourseEntity })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }

  @Roles(AUTH_ROLES.ADMIN)
  @ApiOkResponse({ type: CourseEntity })
  @Get(':courseId/attach-lector/:lectorId')
  attachLector(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('lectorId', ParseIntPipe) lectorId: number,
  ) {
    return this.coursesService.attachLector(courseId, lectorId);
  }
}
