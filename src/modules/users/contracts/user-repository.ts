import { IUser } from './user';

export abstract class IUserRepository {
  abstract findOne(userName: string): Promise<IUser | undefined>;
}
