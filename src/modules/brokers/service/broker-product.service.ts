import { Injectable } from '@nestjs/common';
import { BrokerProductAggregatorDto } from '../dto/broker-product-aggregator.dto';
import { BrokerIntegrationMediator } from '../mediators/broker-integration.mediator';

@Injectable()
export class BrokerProductService {
  constructor(protected readonly brokerMediator: BrokerIntegrationMediator) {}
  public async getAllProducts(): Promise<BrokerProductAggregatorDto[]> {
    try {
      const brokersResult = await Promise.all(
        Array.from(this.brokerMediator.getProviders().entries()).map(
          async ([name, provider]) => ({
            broker: name,
            products: await provider.getProducts(),
          }),
        ),
      );

      return brokersResult;
    } catch (e) {
      console.error(e);
    }
  }
}
