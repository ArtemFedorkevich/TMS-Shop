import { createAction, props } from '@ngrx/store';
import { AuthCredentials, AuthFailurePayload, AuthSuccessPayload } from "./account.interfaces";

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',
  LOGOUT = '[Auth] Logout',
}

export const logIn = createAction(
  AuthActionTypes.LOGIN,
  props<{ payload: AuthCredentials }>()
);

export const logInSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ payload: AuthSuccessPayload }>()
);

export const logInFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ payload: AuthFailurePayload }>()
);

export const registerUp = createAction(
  AuthActionTypes.REGISTER,
  props<{ payload: AuthCredentials }>()
);

export const registerSuccess = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<{ payload: AuthSuccessPayload }>()
);

export const registerFailure = createAction(
  AuthActionTypes.REGISTER_FAILURE,
  props<{ payload: AuthFailurePayload }>()
);

export const logOut = createAction(
  AuthActionTypes.LOGOUT
);

export type AllActionTypes =
  | ReturnType<typeof logIn>
  | ReturnType<typeof logInSuccess>
  | ReturnType<typeof logInFailure>
  | ReturnType<typeof registerUp>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailure>
  | ReturnType<typeof logOut>;
