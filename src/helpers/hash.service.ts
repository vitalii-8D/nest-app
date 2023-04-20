import { Injectable } from '@nestjs/common';
import argon2 = require('argon2');

@Injectable()
export class HashService {
  hashPassword(password: string) {
    return argon2.hash(password + process.env.PASS_SECRET);
  }

  checkPassword(password: string, hash: string) {
    return argon2.verify(hash, password + process.env.PASS_SECRET);
  }
}
