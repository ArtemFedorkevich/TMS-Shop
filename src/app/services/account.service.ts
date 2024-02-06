import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model'

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) {}

  public getToken(key: 'accessToken' | 'refreshToken'): string | null {
    return localStorage.getItem(key);
  }

  logIn(email: string, password: string): Observable<any> {
      return this.http.post<UserModel>(`${environment.backendUrl}/auth/sign-in`, {email, password});
    }

  register(email: string, password: string): Observable<any> {
    return this.http.post<UserModel>(`${environment.backendUrl}/auth/sign-up`, {email, password});
  }

  refreshTokens(): Observable<any> {
    return this.http.get<UserModel>(
      `${environment.backendUrl}/auth/refresh-tokens`, {}
    );
  }
}
