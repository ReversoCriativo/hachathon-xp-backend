export interface IAuthResponse {
  accessToken: string;
}

export abstract class IAuthProvider {
  abstract authenticate(userName: string): Promise<IAuthResponse>;
}
