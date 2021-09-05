import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayRoutingModule} from './play-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
