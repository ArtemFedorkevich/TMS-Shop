import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from './account.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private accountService: AccountService = null as any;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accountService = this.injector.get(AccountService);
    const accessToken: string | null = this.accountService.getToken('accessToken');
    const headers: { [key: string]: string } = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    request = request.clone({ setHeaders: headers });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 404))  {
          console.log(error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken'); //TODO: not just delete Tokens but analyze error and refresh token if required.
          this.router.navigate(['/account']);
        }
        return throwError(error);
      })
    );
  }
}
