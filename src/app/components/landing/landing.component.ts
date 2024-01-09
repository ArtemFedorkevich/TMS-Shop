import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAccountState } from '../../../store/states/app.states';
import { LogOut } from '../../../store/actions/account.actions';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: boolean;
  user = {'email': ''};
  errorMessage = null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAccountState);
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  // TODO: move logout to headers
  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
