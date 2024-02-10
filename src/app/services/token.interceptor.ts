import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private accountService: AccountService = null as any;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accountService = this.injector.get(AccountService);
    const isRefreshRequest = request.url.endsWith('/refresh-tokens');
    const accessToken: string | null = this.accountService.getToken('accessToken');
    const refreshToken: string | null = this.accountService.getToken('refreshToken');
    const headers: { [key: string]: string } = isRefreshRequest
      ? {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json'
        }
      : {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        };
    request = request.clone({ setHeaders: headers });
    return next.handle(request);
  }
}
