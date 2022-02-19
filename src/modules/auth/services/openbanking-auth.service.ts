import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../users/contracts/user-repository';
import { IAuthProvider, IAuthResponse } from '../contracts/auth-provider';
import { ITokenManager } from '../contracts/token-manager';
import { CurrentUserFactory } from '../factories/current-user.factory';

@Injectable()
export class OpenBankingAuthService implements IAuthProvider {
  constructor(
    protected readonly usersRepository: IUserRepository,
    protected readonly tokenService: ITokenManager,
    protected readonly currentUserFactory: CurrentUserFactory,
  ) {}

  public async authenticate(userName: string): Promise<IAuthResponse> {
    const user = await this.usersRepository.findOne(userName);

    if (!user) {
      throw new BadRequestException('invalid-user');
    }

    const currentUser = this.currentUserFactory.create(user);

    return {
      accessToken: user as unknown as string,
    };
  }
}
