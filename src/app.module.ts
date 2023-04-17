import { Module } from '@nestjs/common';
import { TopicsModule } from './topics/topics.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, TopicsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
