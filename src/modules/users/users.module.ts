import { Env } from './../../constants/env.enum';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IUserRepository } from './contracts/user-repository';
import { OpenBankingUserRepository } from './repositories/openbanking-user.repository';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useFactory(config: ConfigService) {
        return {
          baseURL: config.get<string>(Env.BASE_URL),
          headers: {
            'user-agent': 'x-reverso-backend',
            Authorization: `Bearer ${config.get<string>(Env.AUTH_TOKEN)}`,
          },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [
    {
      provide: IUserRepository,
      useClass: OpenBankingUserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class UsersModule {}
