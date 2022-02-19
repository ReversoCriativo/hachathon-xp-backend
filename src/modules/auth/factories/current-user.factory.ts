import { AbstractObjectFactory } from './../../../interfaces/abstract-object-factory';
import { IUser } from './../../users/contracts/user';
import { ICurrentUser } from '../contracts/current-user';

export class CurrentUserFactory
  implements AbstractObjectFactory<Partial<IUser>, ICurrentUser>
{
  create({ bornDate, cpf, name }: Partial<IUser>): ICurrentUser {
    return {
      bornDate,
      cpf,
      name,
    };
  }
}
