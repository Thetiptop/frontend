import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

import {AuthService} from '../../../core/authentification/auth.service';
import {TokenService} from '../../../core/authentification/token.service';
import {AuthStateService} from '../../../core/authentification/auth-state.service';
import {Meta, Title} from '@angular/platform-browser';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {SocialRegisterComponent} from "../../components/social-register/social-register.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // SEO variables
  title = 'Connexion - ThéTipTop';
  description = 'Connectez-vous à votre compte ThéTipTop et jouez pour gagner des cadeaux à coup sûrs !';

  loginForm: FormGroup;
  success: any;
  errors: any;
  isFormSubmitted: boolean;

  isLoggedin: any;

  socilaLoginForm: FormGroup;
  socialUser: SocialUser;
  socialResult: any;
  socialError: any;

  popUpMessage: any;
  wantToRegisterWithGoogle: boolean;
  wantToRegisterWithFacebook: boolean;
  modalRef: any;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private socialAuthService: SocialAuthService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  get form(): any {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    // SEO
    this.metaTagService.updateTag({property: 'og:description', content: this.description});
    this.metaTagService.updateTag({property: 'og:title', content: this.title});
    this.metaTagService.updateTag({property: 'og:image', content: '/assets/images/tea-cups.jpg'});
    this.metaTagService.updateTag({property: 'og:image:alt', content: this.title});
    this.metaTagService.updateTag({name: 'description', content: this.description});

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.isFormSubmitted = false;

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.success = result;
          this.token.handleData(result.access_token);
          this.authState.setAuthState(true);
          this.router.navigate(['/play']);
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

  RegisterWithGoogle() {

    this.loginWithGoogle()

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
            this.authState.setAuthState(true);
            this.token.handleData(this.socialResult.token);
            this.router.navigate(['/accueil']);
          },
          (err) => {
            this.socialResult = err;
            this.wantToRegisterWithGoogle = true;
            this.openSocialRegister()
          }
        );
      },
      (err)=> {
        console.log(err)
      });

  }

  RegisterWithFacebook() {

    this.loginWithFaceBook();

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
            this.authState.setAuthState(true);
            this.token.handleData(this.socialResult.token);
            this.router.navigate(['/accueil']);
          },
          (err) => {
            this.socialResult = err;
            this.wantToRegisterWithFacebook = true;
            this.openSocialRegister()
          }
        );
      },
      (err)=> {
        console.log(err)
      });
  }

  openSocialRegister() {
    this.modalRef = this.modalService.open(SocialRegisterComponent, {centered: true, size: 'lg'});
    this.modalRef.componentInstance.wantToRegisterWithFacebook = this.wantToRegisterWithFacebook;
    this.modalRef.componentInstance.wantToRegisterWithGoogle = this.wantToRegisterWithGoogle;
  }

}
