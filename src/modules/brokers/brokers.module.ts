import { BrokerController } from './controllers/broker.controller';
import { BrokerIntegrationMediator } from './mediators/broker-integration.mediator';
import { Module } from '@nestjs/common';
import { BrokerProvider } from './constants/broker-provider.enum';
import { XpProductIntegration } from './integrations/xp-product.integration';
import { BrokerProductService } from './service/broker-product.service';
import { RicoProductIntegration } from './integrations/rico-product.integration';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    XpProductIntegration,
    RicoProductIntegration,
    {
      provide: BrokerIntegrationMediator,
      useFactory(xp: XpProductIntegration, rico: RicoProductIntegration) {
        const mediator = new BrokerIntegrationMediator();

        mediator.addProvider(BrokerProvider.XP, xp);
        mediator.addProvider(BrokerProvider.RICO, rico);

        return mediator;
      },
      inject: [XpProductIntegration, RicoProductIntegration],
    },
    BrokerProductService,
  ],
  controllers: [BrokerController],
})
export class BrokersModule {}
