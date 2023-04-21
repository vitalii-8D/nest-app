import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashService } from '../helpers/hash.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashService],
  imports: [],
  exports: [UserService],
})
export class UserModule {}
