import { IUser } from './../../users/contracts/user';
import { Env } from './../../../constants/env.enum';
import { Injectable } from '@nestjs/common';
import { IBrokerProduct } from '../contracts/broker-product';
import {
  IBrokerFilters,
  IBrokerIntegration,
  IProductResponsePayload,
} from '../contracts/broker-integration';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { thru, filter } from 'lodash';
import { getInvestorProfile } from '../utils/get-investor-profile';

@Injectable()
export class XpProductIntegration implements IBrokerIntegration {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private async findAllProducts() {
    const { data } = await lastValueFrom(
      this.httpService.get(
        `${this.configService.get(Env.BASE_URL)}/broker/products`,
        {
          headers: {
            'user-agent': 'x-reverso-backend',
            Authorization: `Bearer ${this.configService.get(Env.AUTH_TOKEN)}`,
          },
        },
      ),
    );

    return data;
  }

  private async getInvestorProfile(userName: string) {
    const { data } = await lastValueFrom(
      this.httpService.get(
        `${this.configService.get(
          Env.BASE_URL,
        )}/broker/users/${userName}/suitability`,
        {
          headers: {
            'user-agent': 'x-reverso-backend',
            Authorization: `Bearer ${this.configService.get(Env.AUTH_TOKEN)}`,
          },
        },
      ),
    );

    return data;
  }

  private hydrateResponse(response: any): IBrokerProduct[] {
    const products = [];
    for (const key of Object.keys(response)) {
      const wantedProducts = response[key];
      if (!Array.isArray(wantedProducts)) {
        continue;
      }

      products.push(
        ...wantedProducts.map((product) => ({
          productType: key,
          ...product,
        })),
      );
    }

    return products;
  }

  private applyFilters(
    filters: Partial<IBrokerFilters>,
    investorProfileScale: number,
    products: IBrokerProduct[],
  ) {
    return filter(products, ({ risk, value }) => {
      const hasSecurityRisk = risk <= investorProfileScale;

      if (filters?.value) {
        return hasSecurityRisk && value <= filters.value;
      }

      return hasSecurityRisk;
    });
  }

  public async getProducts(
    user: Partial<IUser>,
    filters?: Partial<IBrokerFilters>,
  ): Promise<IProductResponsePayload> {
    try {
      const investorProfileScale = await this.getInvestorProfile(user.name);

      const products = this.applyFilters(
        filters,
        investorProfileScale,
        thru(await this.findAllProducts(), this.hydrateResponse),
      );

      return {
        investorProfile: getInvestorProfile(investorProfileScale),
        products,
      };
    } catch (e) {
      console.error(e);

      return {
        investorProfile: undefined,
        products: [],
      };
    }
  }
}
