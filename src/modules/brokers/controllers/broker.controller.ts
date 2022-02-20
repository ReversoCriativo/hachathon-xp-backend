import { ICurrentUser } from 'modules/auth/contracts/current-user';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { Protected } from 'modules/auth/decorators/protected.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { BrokerProductService } from '../service/broker-product.service';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';

@Controller({
  path: 'v1/brokers',
})
@ApiTags('Brokers')
export class BrokerController {
  constructor(protected readonly brokerService: BrokerProductService) {}

  @Get()
  @Protected()
  @HttpCode(HttpStatus.OK)
  public async findAll(
    @CurrentUser() user: ICurrentUser,
    @Query() params?: GetProductsFilterDto,
  ) {
    return this.brokerService.getAllProducts(user, params);
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  public async getAllProviders() {
    return this.brokerService.providerList();
  }
}
