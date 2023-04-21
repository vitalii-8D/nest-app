import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      // Check incoming query type
      if (params.action == 'delete') {
        // Delete queries
        // Change action to an update
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
      }
      if (params.action == 'deleteMany') {
        // Delete many queries
        params.action = 'updateMany';
        if (params.args.data != undefined) {
          params.args.data['deletedAt'] = true;
        } else {
          params.args['data'] = { deletedAt: new Date() };
        }
      }

      if (params.action == 'update') {
        params.args.where['deletedAt'] = null;
      }
      if (params.action == 'updateMany') {
        if (
          params.args.where != undefined &&
          params.args.where['deletedAt'] === undefined
        ) {
          params.args.where['deletedAt'] = null;
        } else {
          params.args['where'] = { deletedAt: null };
        }
      }

      if (
        params.action == 'findUnique' ||
        params.action == 'findFirst' ||
        params.action == 'findMany'
      ) {
        if (
          params.args.where != undefined &&
          params.args.where['deletedAt'] === undefined
        ) {
          params.args.where['deletedAt'] = null;
        } else {
          params.args['where'] = { deletedAt: null };
        }
      }

      // const PASSWORD_MASK = '********';
      const result = await next(params);
      // Works
      if (params.model == 'User') {
        // result.name = `${result.firstName} ${result.lastName}`;
        // result.password = PASSWORD_MASK;
      }

      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
