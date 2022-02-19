export abstract class IAuthIntegration {
  abstract getAccessToken(clientId: string, secret: string): Promise<string>;
}
