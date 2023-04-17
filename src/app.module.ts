import { Module } from '@nestjs/common';
import { TopicsModule } from './topics/topics.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaModule as NestPrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule, TopicsModule, NestPrismaModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
