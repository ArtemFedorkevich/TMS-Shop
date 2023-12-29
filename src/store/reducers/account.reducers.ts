import { User } from '../../app/models/user';
import { AuthActionTypes, All } from '../actions/account.actions';

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.REGISTER_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
