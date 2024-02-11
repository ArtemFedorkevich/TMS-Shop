import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./modules/home.module').then(x => x.HomeModule), canActivate: [AuthGuard] },
  { path: 'account', loadChildren: () => import('./modules/account.module').then(x => x.AccountModule) },
  { path: 'products', data: { headerColor: 'black' }, loadChildren: () => import('./modules/products.module').then(x => x.ProductsModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
