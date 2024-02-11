import { ActionReducerMap } from '@ngrx/store';
import * as account from '../reducers/account.reducers';
import { AllActionTypes } from "../actions/account.actions";
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  account: account.State;
}

export const reducers: ActionReducerMap<AppState, AllActionTypes> = {
  account: account.reducer
};

export const selectAccountState = createFeatureSelector<AppState>('account');
