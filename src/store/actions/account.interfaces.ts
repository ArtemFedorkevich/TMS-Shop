export interface BaseAuthCredentials {
  email?: string;
}

export interface AuthCredentials extends BaseAuthCredentials {
  password?: string;
}

export interface AuthSuccessPayload extends BaseAuthCredentials {
  accessToken: string;
  refreshToken: string;
}

export interface AuthFailurePayload {
  error: any;
}
