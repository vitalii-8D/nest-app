import { Module } from '@nestjs/common';
import { TopicsModule } from './topics/topics.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaModule as NestPrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { HashService } from './helpers/hash.service';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.register({
      folder: 'env',
      env: process.env.NODE_ENV || 'development',
    }),
    PrismaModule,
    TopicsModule,
    NestPrismaModule.forRoot(),
    UserModule,
    CoursesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [HashService],
})
export class AppModule {}
