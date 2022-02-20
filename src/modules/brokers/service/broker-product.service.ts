import { IUser } from './../../users/contracts/user';
import { Injectable } from '@nestjs/common';
import { BrokerProductAggregatorDto } from '../dto/broker-product-aggregator.dto';
import { BrokerIntegrationMediator } from '../mediators/broker-integration.mediator';

@Injectable()
export class BrokerProductService {
  constructor(protected readonly brokerMediator: BrokerIntegrationMediator) {}

  public async getAllProducts(
    user: Partial<IUser>,
    filters?: {
      broker: string;
    },
  ): Promise<BrokerProductAggregatorDto[]> {
    try {
      const providers = Array.from(
        this.brokerMediator.getProviders().entries(),
      ).filter(([name]) => (filters?.broker ? filters.broker === name : true));

      const brokersResult = await Promise.all(
        providers.map(async ([name, provider]) => {
          const response = await provider.getProducts(user);

          return {
            broker: name,
            ...response,
          };
        }),
      );

      return brokersResult;
    } catch (e) {
      console.error(e);
    }
  }

  public async providerList() {
    return Array.from(this.brokerMediator.getProviders().keys());
  }
}
