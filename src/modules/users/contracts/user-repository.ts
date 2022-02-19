import { IUser } from './user';

export abstract class IUserRepository {
  abstract findOne(email: string): Promise<IUser>;
}
