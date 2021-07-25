import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/pages/home/home.component';
import { ProfilComponent } from './views/pages/profil/profil.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { PlayComponent } from './views/pages/play/play.component';
import { AboutComponent } from './views/pages/about/about.component';
import { SidebarComponent } from './views/components/sidebar/sidebar.component';
import { BaseComponent } from './views/components/base/base.component';
import { ArchwizardModule } from 'angular-archwizard';

import { AuthInterceptor } from './core/auth.interceptor';
import { AuthGuard } from './core/auth.guard';
import {TranslateModule} from '@ngx-translate/core';


const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  },
  position: 'bottom-right',
  theme: 'classic',
  palette: {
    popup: {
      background: '#000000',
      text: '#ffffff',
      link: '#ffffff'
    },
    button: {
      background: '#d98300',
      text: '#fff',
      border: 'transparent'
    }
  },
  type: 'info',
  content: {
    message: 'Ce site utilise des cookies pour vous garantir la meilleure expérience sur notre site.',
    dismiss: 'Fermer',
    deny: 'Refuser',
    link: 'En savoir plus',
    href: '/about/cookies',
    policy: 'Politique de cookies',
    header: 'Cookies used on the website!',
    allow: 'Autoriser'
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfilComponent,
    LoginComponent,
    RegisterComponent,
    PlayComponent,
    AboutComponent,
    SidebarComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ArchwizardModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [
    AppComponent,
  ]

})
export class AppModule { }
