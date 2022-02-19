import { Env } from './../../../constants/env.enum';
import { Injectable } from '@nestjs/common';
import { IBrokerProduct } from '../contracts/broker-product';
import {
  IBrokerFilters,
  IBrokerIntegration,
} from '../contracts/broker-integration';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

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

  async getProducts(
    filters?: Partial<IBrokerFilters>,
  ): Promise<IBrokerProduct[]> {
    try {
      const response = await this.findAllProducts();

      const products = [];

      for (const key of Object.keys(response)) {
        const wantedProducts = response[key];
        if (!Array.isArray(wantedProducts)) {
          continue;
        }

        /** @todo: verficar regra de renda variável */
        products.push(
          ...wantedProducts.map((product) => ({
            productType: key,
            ...product,
          })),
        );
      }

      return products.filter((product) => {
        if (filters?.risk) {
          return product.risk < filters.risk;
        }

        if (filters?.value) {
          return product.value <= filters.value;
        }

        return true;
      });
    } catch (e) {
      console.error(e);

      return [];
    }
  }
}
