import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IAuthProvider } from './contracts/auth';
import { AuthController } from './controllers/auth.controller';
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
    {
      provide: IAuthProvider,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
