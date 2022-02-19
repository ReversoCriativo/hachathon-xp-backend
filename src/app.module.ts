import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HealthModule, AuthModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
