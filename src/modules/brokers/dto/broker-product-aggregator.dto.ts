import { IBrokerProduct } from '../contracts/broker-product';

export class BrokerProductAggregatorDto {
  broker: string;
  products: IBrokerProduct[];
}
