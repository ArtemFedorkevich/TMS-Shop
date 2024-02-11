import { UserModel } from '../../app/models/user.model';
import { logInSuccess, logInFailure, registerSuccess, registerFailure, logOut } from '../actions/account.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export interface State {
  isAuthenticated: boolean;
  user: UserModel | null;
  errorMessage: string | null;
}

export const reducer = createReducer(
  initialState,
  on(
    logInSuccess,
    registerSuccess,
    (state, action) => ({
      ...state,
      isAuthenticated: true,
      user: {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        email: action.payload.email
      },
      errorMessage: null
    })
  ),
  on(logInFailure, () => ({
    ...initialState,
    errorMessage: 'Incorrect email and/or password.'
  })),
  on(registerFailure, () => ({
    ...initialState,
    errorMessage: 'That email is already in use.'
  })),
  on(logOut, () => initialState)
);
