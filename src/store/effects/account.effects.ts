import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountService } from '../../app/services/account.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure, RegisterUp, RegisterSuccess, RegisterFailure, LogOut
} from '../actions/account.actions';

@Injectable()
export class AccountEffects {

  LogIn = createEffect(() =>
  this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => this.accountService.logIn(payload.email, payload.password).pipe(
      map(user => {
        console.log(user);
        return new LogInSuccess({accessToken: user.accessToken, refreshToken: user.refreshToken, email: payload.email});
      }),
      catchError(error => {
        console.log(error);
        return of(new LogInFailure({ error: error }));
      })
    ))
  )
);

  LogInSuccess = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((action: LogInSuccess) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      this.router.navigateByUrl('/');
    })
  ),
  { dispatch: false });

  LogInFailure = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE)
    ),
    { dispatch: false }
  );

  RegisterUp = createEffect(() =>
  this.actions.pipe(
    ofType(AuthActionTypes.REGISTER),
    map((action: LogIn) => action.payload),
    switchMap(payload => this.accountService.register(payload.email, payload.password).pipe(
      map(user => {
        console.log(user);
        return new RegisterSuccess({accessToken: user.accessToken, refreshToken: user.refreshToken, email: payload.email});
      }),
      catchError(error => {
        console.log(error);
        return of(new RegisterFailure({ error: error }));
      })
    ))
  )
);

  RegisterSuccess = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    tap((action: RegisterSuccess) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      this.router.navigateByUrl('/');
    })
  ),
  { dispatch: false });

  RegisterFailure = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.REGISTER_FAILURE)
    ),
    { dispatch: false }
  );

  LogOut = createEffect(() => {
  return this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    })
  );
}, { dispatch: false });

  constructor(
    private actions: Actions,
    private accountService: AccountService,
    private router: Router
  ) {}
}
