import { Injectable } from '@nestjs/common';
import argon2 = require('argon2');
import { ConfigService } from '../config/config.service';

@Injectable()
export class HashService {
  constructor(private readonly config: ConfigService) {}

  hashPassword(password: string) {
    return argon2.hash(password + this.config.get('PASS_SECRET'));
  }

  checkPassword(password: string, hash: string) {
    return argon2.verify(hash, password + this.config.get('PASS_SECRET'));
  }
}
