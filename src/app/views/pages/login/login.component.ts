import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../../core/authentification/auth.service';
import {TokenService} from '../../../core/authentification/token.service';
import {AuthStateService} from '../../../core/authentification/auth-state.service';
import {SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  success: any;
  errors: any;
  isFormSubmitted: boolean;
  socialUser: SocialUser;
  isLoggedin: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private socialAuthService: SocialAuthService
  ) {
  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.isFormSubmitted = false;

    this.socialAuthService.authState.subscribe(
      (user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
      this.authState.setAuthState(true);
      this.token.handleData(this.socialUser.idToken);
      this.router.navigate(['/accueil']);
      });

    if (-1) {
      console.log('NOOOOO');
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.success = result;
          this.token.handleData(result.access_token);
          this.authState.setAuthState(true);
          this.loginForm.reset();
        },
        res => {
          this.errors = res.error.error;
        }, () => {
          this.router.navigate(['/accueil']);
        }
      );
    }
    this.isFormSubmitted = true;
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginWithFaceBook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
