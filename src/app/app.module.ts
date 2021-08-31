import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';
import {DataTablesModule} from 'angular-datatables';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {ArchwizardModule} from 'angular-archwizard';
import {NgParticlesModule} from 'ng-particles';

import {AppRoutingModule} from './app-routing.module';
import {LoaderService} from './core/loader/loader.service';
import {LoaderInterceptor} from './core/interceptors/loader-interceptor.service';
import {AuthInterceptor} from './core/authentification/auth.interceptor';
import {AuthGuard} from './core/authentification/auth.guard';
import {AuthService} from './core/authentification/auth.service';
import {PlayService} from './core/play/play.service';
import {ChangePasswordService} from './core/password/change-password.service';
import {ResetPasswordService} from './core/password/reset-password.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './views/pages/home/home.component';
import {SidebarComponent} from './views/components/sidebar/sidebar.component';
import {MyLoaderComponent} from './views/components/my-loader/my-loader.component';
import {NotificationComponent} from './views/components/notification/notification.component';
import {FelicitationsComponent} from './views/components/felicitations/felicitations.component';
import {ErrorPageComponent} from './views/pages/error-page/error-page.component';
import {HowToPlayComponent} from './views/components/how-to-play/how-to-play.component';
import {ReclamerModule} from "./views/components/reclamer/reclamer.module";
import {CommonModule} from "@angular/common";

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
    dismiss: 'OK',
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
    SidebarComponent,
    HomeComponent,
    MyLoaderComponent,
    NotificationComponent,
    FelicitationsComponent,
    ErrorPageComponent,
    HowToPlayComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ArchwizardModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgParticlesModule,
    DataTablesModule,
    SocialLoginModule,
    ReclamerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '227935309349-dlugjd7h0nt7304up88v2ctks7fmkrg7.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '4229057453809194'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    AuthGuard,
    AuthService,
    LoaderService,
    PlayService,
    ChangePasswordService,
    ResetPasswordService
  ],
  bootstrap: [
    AppComponent,
  ]

})

export class AppModule {
}
