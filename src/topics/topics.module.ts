import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
  imports: [ConfigModule, AuthModule],
})
export class TopicsModule {}
