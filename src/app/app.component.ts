import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { THEME_COLORS } from "./constants/app.constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TMS-Shop';
  headerColor: typeof THEME_COLORS.BLACK | typeof THEME_COLORS.WHITE = THEME_COLORS.WHITE;
  shouldShowHeaderAndFooter: boolean = true;
  private ngUnsubscribe = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      const currentRouteData = this.route.snapshot.firstChild?.data;
      this.headerColor = currentRouteData?.['headerColor'] || 'white';
      this.shouldShowHeaderAndFooter = !this.router.url.includes('/account');
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

