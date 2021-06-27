import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./views/pages/home/home.component";
import {LoginComponent} from "./views/pages/login/login.component";
import {RegisterComponent} from "./views/pages/register/register.component";
import {ContactComponent} from "./views/pages/contact/contact.component";
import {PlayComponent} from "./views/pages/play/play.component";
import {ProfilComponent} from "./views/pages/profil/profil.component";

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path : 'accueil', component : HomeComponent },
  { path : 'login', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'profile', component : ProfilComponent },
  { path : 'contact', component : ContactComponent },
  { path : 'play', component : PlayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
