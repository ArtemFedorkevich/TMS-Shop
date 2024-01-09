import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule} from "./modules/material/material.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AccountService } from './services/account.service';
import { AccountEffects } from '../store/effects/account.effects';
import { reducers } from '../store/states/app.states';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    EffectsModule.forRoot([AccountEffects]),
    StoreModule.forRoot(reducers, {}),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
    MaterialModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
