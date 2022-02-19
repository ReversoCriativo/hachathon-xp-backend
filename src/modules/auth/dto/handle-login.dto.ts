import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HandleLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  clientId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  clientSecret: string;
}
