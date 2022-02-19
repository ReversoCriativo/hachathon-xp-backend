import { Injectable } from '@nestjs/common';
import { IBrokerProduct } from '../contracts/broker-product';
import {
  IBrokerFilters,
  IBrokerIntegration,
} from '../contracts/broker-integration';

@Injectable()
export class RicoProductIntegration implements IBrokerIntegration {
  async getProducts(
    filters?: Partial<IBrokerFilters>,
  ): Promise<IBrokerProduct[]> {
    console.log('Listando os da RICO');

    return [];
  }
}
