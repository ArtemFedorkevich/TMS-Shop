import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) {}

  public  getToken(): string | null  {
    return localStorage.getItem('accessToken');
  }

  logIn(email: string, password: string): Observable<any> {
      return this.http.post<User>(`${environment.backendUrl}/auth/sign-in`, {email, password});
    }
    //
    // logout() {
    //     // remove user from local storage and set current user to null
    //     localStorage.removeItem('user');
    //     this.userSubject.next(null);
    //     this.router.navigate(['/account/login']);
    // }
    //
    register(email: string, password: string): Observable<any> {
      return this.http.post<User>(`${environment.backendUrl}/auth/sign-up`, {email, password});
    }
}
