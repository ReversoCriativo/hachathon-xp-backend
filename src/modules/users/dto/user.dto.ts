import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../contracts/user';

export class UserDto implements IUser {
  @ApiProperty()
  name: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  salary: number;
  @ApiProperty()
  bornDate: string;
}
