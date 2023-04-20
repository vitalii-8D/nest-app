import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { HashService } from '../helpers/hash.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async validateUserCredentials(email: string, password: string) {
    const users = await this.userService.findAll({ email });
    const user = users[0];
    if (!user) {
      return null;
    }

    const isVerified = await this.hashService.checkPassword(
      password,
      user.password,
    );
    if (!isVerified) {
      return null;
    }

    return user;
  }

  async loginWithCredentials(user: UserEntity) {
    const payload = { role: user.role, id: user.id };
    const token = this.jwt.sign(payload);

    return { token };
  }

  // async login({ email, password }: { email: string; password: string }) {
  //   const users = await this.userService.findAll({ email });
  //   const user = users[0];
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   const isVerified = await this.hashService.checkPassword(
  //     password,
  //     user.password,
  //   );
  //   if (!isVerified) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   const payload = { role: user.role, id: user.id };
  //   const token = this.jwt.sign(payload);
  //
  //   return token;
  // }
}
