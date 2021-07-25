import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/pages/home/home.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { PlayComponent } from './views/pages/play/play.component';
import { ProfilComponent } from './views/pages/profil/profil.component';
import { AboutComponent } from './views/pages/about/about.component';
import { BaseComponent } from './views/components/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'profile',
        component: ProfilComponent
      },
      {
        path : '',
        redirectTo: 'login',
        pathMatch: 'full' },
      {
        path : 'accueil',
        component : HomeComponent
      },
      {
        path : 'login',
        component : LoginComponent
      },
      {
        path : 'register',
        component : RegisterComponent
      },
      {
        path : 'about',
        loadChildren: () => import('./views/pages/about/about.module').then(m => m.AboutModule)
      },
      {
        path : 'play',
        component : PlayComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
