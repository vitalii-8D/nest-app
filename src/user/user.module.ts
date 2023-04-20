import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HashService } from '../helpers/hash.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
