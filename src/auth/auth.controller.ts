import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { TokenEntity } from './entities/token.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({ description: 'Returns token', type: TokenEntity })
  @Post('login')
  async login(@Body() body: LoginDto, @User() user: UserEntity) {
    return this.authService.loginWithCredentials(user);
  }
}
