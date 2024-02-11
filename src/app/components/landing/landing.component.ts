import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { UserModel } from '../../../app/models/user.model';
import { AppState, selectAccountState } from '../../../store/states/app.states';
import { logOut } from '../../../store/actions/account.actions';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: boolean = false;
  user: UserModel = {'email': '', 'accessToken': '', 'refreshToken':''};
  errorMessage = null;

  constructor(
    private store: Store<AppState>,
    private location: Location
  ) {
    this.getState = this.store.select(selectAccountState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(logOut());
  }

  goBack() {
  this.location.back();
  }
}
