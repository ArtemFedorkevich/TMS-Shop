import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AccountService } from './account.service';
import { catchError, switchMap } from 'rxjs/operators';

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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 && error.error && error.error.message === 'jwt expired') {
            return this.refreshTokensAndRetry(request, next);
          } else if (error.status === 401 || error.status === 404) {
            // Unauthorized or Not Found, remove tokens and navigate to account page
            console.log(error);
            this.clearTokensAndNavigate();
          }
        }
        return throwError(error);
      })
    );
  }

  private refreshTokensAndRetry(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.accountService.refreshTokens().pipe(
      switchMap((user) => {
        // Update tokens in local storage
        localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('refreshToken', user.refreshToken);

        // Retry the original request with updated tokens
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.accessToken}`
          }
        });

        return next.handle(clonedRequest);
      }),
      catchError((refreshError: any) => {
        console.error('Refresh tokens failed:', refreshError);
        this.clearTokensAndNavigate();
        return throwError(refreshError);
      })
    );
  }

  private clearTokensAndNavigate(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/account']);
  }
}
