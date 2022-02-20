import { IUser } from './../../users/contracts/user';
import { IBrokerProduct } from './broker-product';

export interface IBrokerFilters {
  value: number;
}

export interface IProductResponsePayload {
  investorProfile: string;
  products: IBrokerProduct[];
}

export interface IBrokerIntegration {
  getProducts(
    forUser: Partial<IUser>,
    filters?: Partial<IBrokerFilters>,
  ): Promise<IProductResponsePayload>;
}
