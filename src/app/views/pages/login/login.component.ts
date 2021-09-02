import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

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
  socilaLoginForm: FormGroup;
  socialUser: SocialUser;
  success: any;
  errors: any;
  isFormSubmitted: boolean;
  isLoggedin: any;
  description = 'Connectez-vous à votre compte ThéTipTop et jouez pour gagner des cadeaux à coup sûrs !';
  socialResult: any;

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
    this.metaTagService.updateTag({name: 'description', content: this.description});
    this.metaTagService.updateTag({property: 'og:title', content: this.title});
    this.metaTagService.updateTag({name: 'og:description', content: this.description});
    this.metaTagService.updateTag({property: 'og:image', content: '/assets/mango-bg-.jpg'});
    this.metaTagService.updateTag({property: 'og:image:alt', content: this.title});

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.isFormSubmitted = false;

    this.socialAuthService.authState.subscribe(
      (user) => {
        this.socialUser = user;
        const formData = new FormData();
        formData.append('name', this.socialUser.name);
        formData.append('email', this.socialUser.email);
        formData.append('id', this.socialUser.id);
        formData.append('provider', this.socialUser.provider);

        this.authService.socialAuthLogin(formData).subscribe(
          (res) => {
            this.socialResult = res;
            this.token.handleData(this.socialResult.token);
            this.authState.setAuthState(true);
            this.router.navigate(['/play']);
          },
          (err) => {
            this.socialResult = err;
            console.log(this.socialResult)
          }
        );
      },
      (err)=> {
        console.log(err)
      }
      );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.success = result;
          this.token.handleData(result.access_token);
          this.authState.setAuthState(true);
          this.goToPlay();
        },
        error => {
          this.errors = error.error.error;
        },
        () => {
          this.loginForm.reset();
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

  goToPlay(): void {
    this.router.navigate(['/play']);
  }

}
