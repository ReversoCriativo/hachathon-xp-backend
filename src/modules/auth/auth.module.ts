import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { IAuthProvider } from './contracts/auth-provider';
import { OpenBankingAuthService } from './services/openbanking-auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthProvider,
      useClass: OpenBankingAuthService,
    },
  ],
})
export class AuthModule {}
