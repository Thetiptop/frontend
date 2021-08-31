import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ResetPasswordComponent} from "./reset-password.component";
import {ResetPasswordRoutingModule} from "./reset-password-routing.module";

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ResetPasswordModule {
}
