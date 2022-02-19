import { IUserRepository } from 'modules/users/contracts/user-repository';
import { IUser } from './../../users/contracts/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(protected readonly usersRepository: IUserRepository) {}

  public async getUserDetails(userName: string): Promise<IUser> {
    return this.usersRepository.findOne(userName);
  }
}
