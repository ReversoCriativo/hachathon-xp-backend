import { Module } from '@nestjs/common';
import { IUserRepository } from './contracts/user-repository';
import { OpenBankingUserRepository } from './repositories/openbanking-user.repository';

@Module({
  providers: [
    {
      provide: IUserRepository,
      useClass: OpenBankingUserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class UsersModule {}
