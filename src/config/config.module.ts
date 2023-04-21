import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS_TOKEN } from './constants/config-key.constant';
import { IOptions } from './interfaces/options.interface';

@Global()
@Module({})
export class ConfigModule {
  static register(options: IOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS_TOKEN,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
