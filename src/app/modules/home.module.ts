import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../components/home/home.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "./material/material.module";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        HomeComponent,
    ]
})
export class HomeModule { }
