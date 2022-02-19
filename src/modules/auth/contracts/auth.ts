export abstract class IAuthProvider {
  abstract getGrantToken(clientId: string, secret: string): Promise<string>;
}
