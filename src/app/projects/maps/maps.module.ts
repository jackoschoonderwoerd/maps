import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MapsMaterialModule } from './maps-material.module';


@NgModule({
    declarations: [
        MapsComponent
    ],
    imports: [
        CommonModule,
        MapsRoutingModule,
        ReactiveFormsModule,
        MapsMaterialModule,
        FormsModule,

    ]
})
export class MapsModule { }
