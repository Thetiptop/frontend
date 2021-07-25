import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { CookiesComponent } from './cookies/cookies.component';
import { ConfidentialityComponent } from './confidentiality/confidentiality.component';
import { CguComponent } from './cgu/cgu.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path : '',
        redirectTo: 'cgu',
        pathMatch: 'full',
      },
      {
        path: 'cookies',
        component: CookiesComponent
      },
      {
        path: 'confidentiality',
        component: ConfidentialityComponent
      },
      {
        path: 'cgu',
        component: CguComponent
      },
      {
        path: 'mentions-legales',
        component: MentionsLegalesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [CookiesComponent, CguComponent, MentionsLegalesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AboutModule { }
