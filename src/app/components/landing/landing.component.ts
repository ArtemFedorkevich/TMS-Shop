import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/user';
import { AppState } from '../../../store/states/app.states';
import { LogOut } from '../../../store/actions/account.actions';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}

