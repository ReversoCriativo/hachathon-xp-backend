import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../contracts/user';
import { IUserRepository } from '../contracts/user-repository';

@Injectable()
export class OpenBankingUserRepository implements IUserRepository {
  constructor(protected readonly httpService: HttpService) {}

  public async findOne(userName: string): Promise<IUser | undefined> {
    try {
      const { data, status } = await lastValueFrom(
        this.httpService.get<IUser>(`/openbanking/users/${userName}`),
      );

      /** user does not found */
      if (status === HttpStatus.NO_CONTENT) {
        return undefined;
      }

      return data;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
