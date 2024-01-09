import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) {}

  public getToken(key: 'accessToken' | 'refreshToken'): string | null {
    return localStorage.getItem(key);
  }

  logIn(email: string, password: string): Observable<any> {
      return this.http.post<User>(`${environment.backendUrl}/auth/sign-in`, {email, password});
    }

  register(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${environment.backendUrl}/auth/sign-up`, {email, password});
  }
}
