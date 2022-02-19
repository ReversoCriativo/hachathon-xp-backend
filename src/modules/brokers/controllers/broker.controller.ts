import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { BrokerProductService } from '../service/broker-product.service';

@Controller({
  path: 'v1/brokers',
})
@ApiTags('Brokers')
export class BrokerController {
  constructor(protected readonly brokerService: BrokerProductService) {}

  @Get()
  public async findAll() {
    return this.brokerService.getAllProducts();
  }
}
