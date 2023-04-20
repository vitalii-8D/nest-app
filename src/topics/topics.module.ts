import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
  imports: [PrismaModule, AuthModule],
})
export class TopicsModule {}
