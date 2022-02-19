import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IAuthProvider } from './contracts/auth';
import { IAuthIntegration } from './contracts/auth-integration';
import { AuthController } from './controllers/auth.controller';
import { OpenBankingAuthIntegration } from './integration/openbanking-auth.integration';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({}),
      inject: [],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: IAuthProvider,
      useClass: AuthService,
    },
    {
      provide: IAuthIntegration,
      useClass: OpenBankingAuthIntegration,
    },
  ],
})
export class AuthModule {}
