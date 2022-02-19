import { BadRequestException, Injectable } from '@nestjs/common';
import { IAuthProvider } from '../contracts/auth';
import { IAuthIntegration } from '../contracts/auth-integration';

@Injectable()
export class AuthService implements IAuthProvider {
  constructor(protected readonly authIntegration: IAuthIntegration) {}
  public async getGrantToken(
    clientId: string,
    secret: string,
  ): Promise<string> {
    try {
      return await this.authIntegration.getAccessToken(clientId, secret);
    } catch (e) {
      throw new BadRequestException('failed-to-call-open-banking');
    }
  }
}
