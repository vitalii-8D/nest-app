import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [PrismaModule, TopicsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
