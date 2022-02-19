import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'v1/auth',
})
@ApiTags('Auth')
export class AuthController {
  @Post()
  async login() {
    return [];
  }
}
