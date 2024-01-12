import { createAction, props } from '@ngrx/store';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',
  LOGOUT = '[Auth] Logout',
}

export const LogIn = createAction(
  AuthActionTypes.LOGIN,
  props<{ payload: any }>()
);

export const LogInSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ payload: any }>()
);

export const LogInFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ payload: any }>()
);

export const RegisterUp = createAction(
  AuthActionTypes.REGISTER,
  props<{ payload: any }>()
);

export const RegisterSuccess = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<{ payload: any }>()
);

export const RegisterFailure = createAction(
  AuthActionTypes.REGISTER_FAILURE,
  props<{ payload: any }>()
);

export const LogOut = createAction(
  AuthActionTypes.LOGOUT,
);

export type All =
  | ReturnType<typeof LogIn>
  | ReturnType<typeof LogInSuccess>
  | ReturnType<typeof LogInFailure>
  | ReturnType<typeof RegisterUp>
  | ReturnType<typeof RegisterSuccess>
  | ReturnType<typeof RegisterFailure>
  | ReturnType<typeof LogOut>;
