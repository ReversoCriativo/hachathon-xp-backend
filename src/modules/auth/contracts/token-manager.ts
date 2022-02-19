export abstract class ITokenManager {
  /**
   * Create and access token
   *
   * @param payload
   * @param timeout
   */
  abstract create<T>(payload: T, timeout?: number): Promise<string>;

  abstract verify<T>(token: string): Promise<T>;
}
