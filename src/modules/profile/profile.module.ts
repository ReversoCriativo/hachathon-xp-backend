import { ProfileService } from './services/profile.service';
import { AuthModule } from './../auth/auth.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
