import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from "./about.component";
import {CguComponent} from "./cgu/cgu.component";
import {CookiesComponent} from "./cookies/cookies.component";
import {MentionsLegalesComponent} from "./mentions-legales/mentions-legales.component";
import {ConfidentialityComponent} from "./confidentiality/confidentiality.component";


const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      { path: '',
        redirectTo: 'cgu',
        pathMatch: 'full'
      },
      { path: 'cgu', component: CguComponent },
      { path: 'cookies', component: CookiesComponent },
      { path: 'confidentiality', component: ConfidentialityComponent },
      { path: 'mentions-legales', component: MentionsLegalesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
