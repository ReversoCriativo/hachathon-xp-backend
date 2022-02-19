import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { IAuthProvider } from '../contracts/auth';

export class AuthService implements IAuthProvider {
  constructor(protected readonly httpService: HttpService) {}
  public async getGrantToken(
    clientId: string,
    secret: string,
  ): Promise<string> {
    try {
      // const { data } = await lastValueFrom(
      // 	await this.httpService.
      // );
      return '';
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
