export interface IUserGoogle {
  user: User;
  providerId: string;
  _tokenResponse: TokenResponse;
  operationType: string;
}

interface TokenResponse {
  federatedId: string;
  providerId: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  fullName: string;
  lastName: string;
  photoUrl: string;
  localId: string;
  displayName: string;
  idToken: string;
  context: string;
  oauthAccessToken: string;
  oauthExpireIn: number;
  refreshToken: string;
  expiresIn: string;
  oauthIdToken: string;
  rawUserInfo: string;
  kind: string;
}

interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerData: ProviderDatum[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

interface ProviderDatum {
  providerId: string;
  uid: string;
  displayName: string;
  email: string;
  phoneNumber?: any;
  photoURL: string;
}
