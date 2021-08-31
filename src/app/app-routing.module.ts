import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./views/pages/home/home.component";
import {RegisterComponent} from "./views/pages/register/register.component";
import {ErrorPageComponent} from "./views/pages/error-page/error-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: HomeComponent
  },
  {
    path : 'reset-password',
    loadChildren: () => import('./views/pages/reset-password/reset-password-module')
      .then(mod => mod.ResetPasswordModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./views/pages/profil/profil.module')
      .then(mod => mod.ProfilModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./views/pages/register/register.module')
      .then(mod => mod.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/pages/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./views/pages/play/play.module')
      .then(mod => mod.PlayModule)
  },
  {
    path : 'about',
    loadChildren: () => import('./views/pages/about/about.module')
      .then(m => m.AboutModule)
  },
  { path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Non Trouvé',
      desc: 'Oups!! La page que vous cherchez n\'existe pas'
    }
  },
  { path: 'error/:type', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
