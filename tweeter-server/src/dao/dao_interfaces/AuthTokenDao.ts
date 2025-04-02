import { AuthTokenEntity } from "../entities/AuthTokenEntity";

export interface AuthTokenDao {
  putAuthToken(authToken: AuthTokenEntity): Promise<void>;

  getAuthToken(token: string): Promise<AuthTokenEntity | undefined>;

  updateAuthToken(token: string, timeStamp: number): Promise<void>;

  deleteAuthToken(token: string): Promise<void>;

  checkAuthToken(token: string): Promise<boolean>;
}
