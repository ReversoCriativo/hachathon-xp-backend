import { Env } from './../../../constants/env.enum';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITokenManager } from '../contracts/token-manager';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtTokenService implements ITokenManager {
  constructor(protected readonly configService: ConfigService) {}

  public async verify<T>(token: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      jwt.verify(
        token,
        this.configService.get(Env.TOKEN_SECRET) as string,
        (err: any, decoded: any) => {
          if (err || !decoded) {
            return reject(this.resolveVerifyError(err));
          }

          resolve(decoded);
        },
      );
    });
  }

  private resolveVerifyError(err: Error): Error {
    if (!err) {
      return new BadRequestException('token-type-not-match');
    }

    switch (err.name) {
      case 'TokenExpiredError':
        return new BadRequestException('token-expired');
      default:
        return new BadRequestException('token-invalid');
    }
  }

  async create<T>(payload: T, timeout?: number): Promise<string> {
    return this.sign(
      payload,
      timeout || this.configService.get(Env.TOKEN_EXPIRATION),
    );
  }

  protected async sign(data: any, exp?: number) {
    if (exp) data.exp = Math.floor(Date.now() / 1000) + exp * 60;
    return jwt.sign(data, this.configService.get(Env.TOKEN_SECRET) as string);
  }
}
