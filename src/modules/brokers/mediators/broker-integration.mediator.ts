import { IBrokerIntegration } from '../contracts/broker-integration';

export class BrokerIntegrationMediator {
  protected repositories = new Map<string, IBrokerIntegration>();

  public addProvider(name: string, repository: IBrokerIntegration) {
    this.repositories.set(name, repository);
  }

  public getProviders(): Map<string, IBrokerIntegration> {
    return this.repositories;
  }
}
