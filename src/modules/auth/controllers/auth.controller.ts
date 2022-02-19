import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { HandleLoginDto } from '../dto/handle-login.dto';
import { AuthService } from '../services/auth.service';

@Controller({
  path: 'v1/auth',
})
@ApiTags('Auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post()
  @ApiBody({
    type: HandleLoginDto,
  })
  async login(@Body() payload: HandleLoginDto) {
    return this.authService.getGrantToken(
      payload.clientId,
      payload.clientSecret,
    );
  }
}
