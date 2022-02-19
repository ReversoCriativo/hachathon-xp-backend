import { IUser } from '../contracts/user';
import { IUserRepository } from '../contracts/user-repository';

export class OpenBankingUserRepository implements IUserRepository {
  async findOne(email: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
