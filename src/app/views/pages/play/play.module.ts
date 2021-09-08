import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PlayRoutingModule} from './play-routing.module';
import {PlayComponent} from "./play.component";


@NgModule({
  declarations: [
    PlayComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlayModule {
}
