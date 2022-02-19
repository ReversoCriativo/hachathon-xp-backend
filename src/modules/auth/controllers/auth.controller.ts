import { UserDto } from './../../users/dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthProvider } from '../contracts/auth-provider';
import { HandleLoginDto } from '../dto/handle-login.dto';

@Controller({
  path: 'v1/auth',
})
@ApiTags('Auth')
export class AuthController {
  constructor(protected readonly provider: IAuthProvider) {}

  @Post('login')
  @ApiBody({
    type: HandleLoginDto,
  })
  @ApiResponse({
    type: UserDto,
  })
  async login(@Body() { user }: HandleLoginDto) {
    return this.provider.authenticate(user);
  }
}
