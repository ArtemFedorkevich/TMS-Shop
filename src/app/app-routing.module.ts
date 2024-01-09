import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: () => import('./modules/account.module').then(x => x.AccountModule) },
  { path: 'products', component: HomeComponent, data: { headerColor: 'black' }, canActivate: [AuthGuard] },  // TODO: add other component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
