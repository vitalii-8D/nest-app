import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { QueryUserDto } from './dto/query-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import { Roles } from '../auth/decorators/role.decorator';
import { AUTH_ROLES } from '../auth/constants/role-keys.constant';

@Roles(AUTH_ROLES.ALL)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get()
  findAll(@Query() query: QueryUserDto) {
    return this.userService.findAll(query);
  }

  @ApiOkResponse({ type: UserEntity })
  @Get('me')
  me(@User() user: UserEntity) {
    return this.userService.findOne(user.id);
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @ApiOkResponse({ type: UserEntity })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOkResponse({ type: UserEntity })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Roles(AUTH_ROLES.STUDENT)
  @ApiOkResponse({ type: UserEntity })
  @Get('enter-course/:id')
  enterCourse(@User() user: UserEntity, @Param('id', ParseIntPipe) id: number) {
    return this.userService.enterCourse(user.id, id);
  }
}
