import { ActionReducerMap } from '@ngrx/store';
import * as account from '../reducers/account.reducers';
import { All } from "../actions/account.actions";

export interface AppState {
  account: account.State;
}

export const reducers: ActionReducerMap<AppState, All> = {
  account: account.reducer
};
