import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TMS-Shop'
  constructor(private router: Router) {}

  shouldShowHeaderAndFooter(): boolean {
    return !this.router.url.includes('/account');
  }
}
