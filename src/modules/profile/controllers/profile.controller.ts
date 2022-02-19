import { ProfileService } from './../services/profile.service';
import { UserDto } from './../../users/dto/user.dto';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protected } from '../../auth/decorators/protected.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ICurrentUser } from '../../auth/contracts/current-user';

@Controller({
  path: 'v1/me',
})
@ApiTags('Profile')
export class ProfileController {
  constructor(protected readonly service: ProfileService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserDto,
  })
  @Protected()
  public async details(@CurrentUser() user: ICurrentUser) {
    return this.service.getUserDetails(user.name);
  }
}
