import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../users/contracts/user-repository';
import { IAuthProvider, IAuthResponse } from '../contracts/auth-provider';

@Injectable()
export class OpenBankingAuthService implements IAuthProvider {
  constructor(protected readonly usersRepository: IUserRepository) {}
  public async authenticate(userName: string): Promise<IAuthResponse> {
    const user = await this.usersRepository.findOne(userName);

    if (!user) {
      throw new BadRequestException('invalid-user');
    }

    return {
      accessToken: user as unknown as string,
    };
  }
}
