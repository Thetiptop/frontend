import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider} from 'angularx-social-login';

import {AuthService} from '../../../core/authentification/auth.service';
import {TokenService} from '../../../core/authentification/token.service';
import {AuthStateService} from '../../../core/authentification/auth-state.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // SEO variables
  title = 'Connexion - ThéTipTop';

  loginForm: FormGroup;
  success: any;
  errors: any;
  isFormSubmitted: boolean;
  socialUser: SocialUser;
  isLoggedin: boolean;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private socialAuthService: SocialAuthService
  ) {
  }

  get form(): any {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Description' }
    );

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.isFormSubmitted = false;

    this.socialAuthService.authState.subscribe(
      (user) => {
      this.socialUser = user;
      /*this.loginForm.patchValue({
        email: this.socialUser.name,
        socialToken: this.socialUser.authToken,
       });*/
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
      // this.authState.setAuthState(true);
      this.token.handleData(this.socialUser.idToken);
      // this.router.navigate(['/accueil']);
      });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.success = result;
          this.token.handleData(result.access_token);
          console.log(result.access_token);
          this.authState.setAuthState(true);
          this.loginForm.reset();
        },
        error => {
          this.errors = error.error.error;
        },
        () => {
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/play');
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
