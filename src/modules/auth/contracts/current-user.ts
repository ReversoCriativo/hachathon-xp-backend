import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './../../users/contracts/user';

export abstract class ICurrentUser implements Partial<IUser> {
  @ApiProperty()
  name: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  bornDate: string;
}
