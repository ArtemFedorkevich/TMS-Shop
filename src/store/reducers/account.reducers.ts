import { UserModel } from '../../app/models/user.model';
import { LogInSuccess, LogInFailure, RegisterSuccess, RegisterFailure, LogOut } from '../actions/account.actions';
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
    LogInSuccess,
    RegisterSuccess,
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
  on(LogInFailure, () => ({
    ...initialState,
    errorMessage: 'Incorrect email and/or password.'
  })),
  on(RegisterFailure, () => ({
    ...initialState,
    errorMessage: 'That email is already in use.'
  })),
  on(LogOut, () => initialState)
);
