import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountService } from '../../app/services/account.service';
import {
  AuthActionTypes,
  logIn, logInSuccess, logInFailure, registerUp, registerSuccess, registerFailure
} from '../actions/account.actions';


@Injectable()
export class AccountEffects {

  logIn = createEffect(() =>
  this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: ReturnType<typeof logIn>) => action.payload),
    switchMap(payload => this.accountService.logIn(payload.email, payload.password).pipe(
      map(user => {
        return logInSuccess({payload: {accessToken: user.accessToken, refreshToken: user.refreshToken, email: payload.email}});
      }),
      catchError(error => {
        return of(logInFailure({payload: { error: error }}));
      })
    ))
  )
);

  logInSuccess = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((action: ReturnType<typeof logInSuccess>) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      this.router.navigateByUrl('/'); // TODO: redirect to original page
    })
  ),
  { dispatch: false });

  logInFailure = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE)
    ),
    { dispatch: false }
  );

  registerUp = createEffect(() =>
  this.actions.pipe(
    ofType(AuthActionTypes.REGISTER),
    map((action: ReturnType<typeof registerUp>) => action.payload),
    switchMap(payload => this.accountService.register(payload.email, payload.password).pipe(
      map(user => {
        return registerSuccess({payload: {accessToken: user.accessToken, refreshToken: user.refreshToken, email: payload.email}});
      }),
      catchError(error => {
        return of(registerFailure({payload: { error: error }}));
      })
    ))
  )
);

  registerSuccess = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    tap((action: ReturnType<typeof registerSuccess>) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      this.router.navigateByUrl('/');
    })
  ),
  { dispatch: false });

  registerFailure = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.REGISTER_FAILURE)
    ),
    { dispatch: false }
  );

  logOut = createEffect(() => {
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
