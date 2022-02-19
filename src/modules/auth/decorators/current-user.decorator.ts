import { createParamDecorator } from '@nestjs/common';
import { ICurrentUser } from '../contracts/current-user';

export const CurrentUser = createParamDecorator((_: any, request: any) => {
  return request.args[0].user as ICurrentUser;
});
