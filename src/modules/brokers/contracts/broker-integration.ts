import { IBrokerProduct } from './broker-product';

export interface IBrokerFilters {
  risk: number;
  value: number;
}

export interface IBrokerIntegration {
  getProducts(filters?: Partial<IBrokerFilters>): Promise<IBrokerProduct[]>;
}
