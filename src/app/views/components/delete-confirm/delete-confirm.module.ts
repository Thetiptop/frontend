import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeleteConfirmComponent} from "./delete-confirm.component";


@NgModule({
  declarations: [
    DeleteConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DeleteConfirmModule {
}
