import { OpenBankingException } from './../exceptions/open-banking.exception';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IAuthIntegration } from '../contracts/auth-integration';

@Injectable()
export class OpenBankingAuthIntegration implements IAuthIntegration {
  constructor(protected readonly httpService: HttpService) {}
  async getAccessToken(clientId: string, secret: string): Promise<string> {
    try {
      return ''; /** @todo: adicionar chamada para api */
    } catch (e) {
      throw new OpenBankingException(e.response.data, e.status);
    }
  }
}
