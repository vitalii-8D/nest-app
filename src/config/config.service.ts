import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { CONFIG_OPTIONS_TOKEN } from './constants/config-key.constant';
import { IEnvConfig } from './interfaces/env-config.interface';
import { IOptions } from './interfaces/options.interface';
import * as process from 'process';

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfig;
  constructor(
    @Inject(CONFIG_OPTIONS_TOKEN)
    private options: IOptions,
  ) {
    const filePath = `${options.env}.env`;
    const envFile = path.resolve(process.cwd(), options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    console.log(this.envConfig);
    // const filePath = `development.env`;
    // const envFile = path.resolve(process.cwd(), 'env', filePath);
    // this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    console.log('Get.log');
    return this.envConfig[key];
  }
}
