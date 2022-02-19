import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @ApiProperty()
  broker: string;
}
