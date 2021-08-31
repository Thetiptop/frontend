import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register.component";
import {RegisterRoutingModule} from "./register-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ArchwizardModule} from "angular-archwizard";

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ArchwizardModule
  ]
})
export class RegisterModule {
}
