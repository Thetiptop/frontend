import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/pages/home/home.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { PlayComponent } from './views/pages/play/play.component';
import { BaseComponent } from './views/components/base/base.component';
import { AuthGuard } from './core/authentification/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';
import {HowToPlayComponent} from './views/components/how-to-play/how-to-play.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path : '',
        redirectTo: 'accueil',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/pages/profil/profil.module').then(m => m.AboutModule)
      },
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
        path : 'reset-password',
        component : ResetPasswordComponent
      },
      {
        path : 'about',
        loadChildren: () => import('./views/pages/about/about.module').then(m => m.AboutModule)
      },
      {
        path : 'play',
        canActivate: [AuthGuard],
        component : PlayComponent
      },
    ]
  },
  { path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  { path: 'error/:type', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
