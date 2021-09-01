import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { CookiesComponent } from './cookies/cookies.component';
import { ConfidentialityComponent } from './confidentiality/confidentiality.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { CguComponent } from './cgu/cgu.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: { animation: 'isLeft'},
    children: [
      {
        path : '',
        redirectTo: 'cgu',
        pathMatch: 'full',
      },
      {
        path: 'cgu',
        component: CguComponent,
        data: { animation: 'isLeft'}
      },
      {
        path: 'cookies',
        component: CookiesComponent,
        data: { animation: 'isLeft'}
      },
      {
        path: 'confidentiality',
        component: ConfidentialityComponent,
        data: { animation: 'isLeft'}
      },
      {
        path: 'mentions-legales',
        component: MentionsLegalesComponent,
        data: { animation: 'isLeft'}
      }
    ]
  }
];

@NgModule({
  declarations: [CookiesComponent, MentionsLegalesComponent, ConfidentialityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AboutModule { }
