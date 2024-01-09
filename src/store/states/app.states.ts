import { ActionReducerMap } from '@ngrx/store';
import * as account from '../reducers/account.reducers';
import { All } from "../actions/account.actions";
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  account: account.State;
}

export const reducers: ActionReducerMap<AppState, All> = {
  account: account.reducer
};

export const selectAccountState = createFeatureSelector<AppState>('account');
