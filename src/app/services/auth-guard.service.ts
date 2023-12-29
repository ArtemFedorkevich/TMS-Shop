import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
class PermissionsService {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.accountService.getToken();
        if (token && token !== 'undefined') {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page
        // TODO: redirect ??, use state??
        this.router.navigate(['/account']);
        return false;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
