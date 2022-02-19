import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({}),
      inject: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
