import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from '../components/products/products.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "./material/material.module";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductsRoutingModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        ProductsComponent,
    ]
})
export class ProductsModule { }
