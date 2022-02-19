import { CurrentUserFactory } from './factories/current-user.factory';
import { JwtTokenService } from './services/jwt-token.service';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { IAuthProvider } from './contracts/auth-provider';
import { OpenBankingAuthService } from './services/openbanking-auth.service';
import { AuthController } from './controllers/auth.controller';
import { ITokenManager } from './contracts/token-manager';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthProvider,
      useClass: OpenBankingAuthService,
    },
    {
      provide: ITokenManager,
      useClass: JwtTokenService,
    },
    CurrentUserFactory,
    JwtStrategy,
  ],
})
export class AuthModule {}
