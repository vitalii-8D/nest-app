import { Module } from '@nestjs/common';
import { TopicsModule } from './topics/topics.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaModule as NestPrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    PrismaModule,
    TopicsModule,
    NestPrismaModule.forRoot(),
    UserModule,
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
