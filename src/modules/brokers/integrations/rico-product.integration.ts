import { IUser } from './../../users/contracts/user';
import { Injectable } from '@nestjs/common';
import {
  IBrokerFilters,
  IBrokerIntegration,
  IProductResponsePayload,
} from '../contracts/broker-integration';
import { InvestorProfile } from '../constants/investor-profile.enum';

@Injectable()
export class RicoProductIntegration implements IBrokerIntegration {
  async getProducts(
    forUser: Partial<IUser>,
    filters?: Partial<IBrokerFilters>,
  ): Promise<IProductResponsePayload> {
    return {
      investorProfile: InvestorProfile.CONSERVATIVE,
      products: [],
    };
  }
}
