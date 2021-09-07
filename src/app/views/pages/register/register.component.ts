import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WizardComponent as BaseWizardComponent} from 'angular-archwizard';
import {AuthService} from '../../../core/authentification/auth.service';
import {ConfirmedValidator} from '../../../core/authentification/confirm-validator';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Meta, Title} from '@angular/platform-browser';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AuthStateService} from "../../../core/authentification/auth-state.service";
import {TokenService} from "../../../core/authentification/token.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {SocialRegisterComponent} from "../../components/social-register/social-register.component";

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;
  isForm1Submitted: boolean | undefined;
  isForm2Submitted: boolean | undefined;
  isForm3Submitted: boolean | undefined;
  errors: any;
  success: any;
  display = true;
  private mailChimpEndpoint = 'https://christaime.us7.list-manage.com/subscribe/post-json?u=c789d045d87cc22bd9756a879&amp;id=cf5d252aa7&';


  @ViewChild('wizardForm') wizardForm: BaseWizardComponent | undefined;
  formData: FormData;
  title= 'Inscription - ThéTipTop';
  description = 'Inscrivez-vous pour gagner des nombreux cadeaux: infuseurs, thés detox, thés signature ou coffrets découverte!';

  socialUser: SocialUser;
  socialResult: any;
  wantToRegisterWithGoogle: boolean;
  wantToRegisterWithFacebook: boolean;

  modalRef: any;

  constructor(
    public formBuilder: FormBuilder,
    private titleService: Title,
    private metaTagService: Meta,
    public authService: AuthService,
    private socialAuthService: SocialAuthService,
    private authState: AuthStateService,
    private token: TokenService,
    private http: HttpClient,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // Returns form controls
  get form1(): any {
    return this.validationForm1.controls;
  }

  // Returns form controls
  get form2(): any {
    return this.validationForm2.controls;
  }

  // Returns form controls
  get form3(): any {
    return this.validationForm3.controls;
  }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({name: 'description', content: this.description});
    this.metaTagService.updateTag({property: 'og:title', content: this.title});
    this.metaTagService.updateTag({name: 'og:description', content: this.description});
    this.metaTagService.updateTag({property: 'og:image', content: '/assets/images/mango-bg.jpg'});
    this.metaTagService.updateTag({property: 'og:image:alt', content: this.title});

    /** form1 value validation */
    this.validationForm1 = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ])?[a-zA-ZÀ-ÿ]*)*$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      telephone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    });

    /** form2 value validation */
    this.validationForm2 = this.formBuilder.group({
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9À-ÿ]+(([',. -][a-zA-Z0-9À-ÿ])?[a-zA-Z0-9À-ÿ]*)*$/)]],
      additional_address: ['', [Validators.pattern(/^[a-zA-Z0-9À-ÿ]+(([',. -][a-zA-Z0-9À-ÿ])?[a-zA-Z0-9À-ÿ]*)*$/)]],
      postal_code: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      ville: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ])?[a-zA-ZÀ-ÿ]*)*$/)]]
    });

    /** form3 value validation */
    this.validationForm3 = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
      cgu: [false, Validators.requiredTrue],
      canLegalyPlay: [false, Validators.requiredTrue],
      newsletter: [false]
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
    this.isForm3Submitted = false;
  }

  /**  Go to next step 2 while form value is valid */
  form1Submit(): void {
    if (this.validationForm1.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  /** Go to next step 3 while form value is valid */
  form2Submit(): void {
    if (this.validationForm2.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm2Submitted = true;
  }

  /** Go to register while form 3 value is valid */
  form3Submit(): void {
    if (this.validationForm3.valid) {
      this.authService.register(this.getData()).subscribe(
        result => {
          this.success = result.success;
          this.display = false;
          this.wizardForm.goToNextStep();
        },
        error => {
          this.errors = error.error.error;
        }
      );
    }

    /** Mailchimp **/
    if (this.validationForm1.valid && this.validationForm3.value.newsletter === true) {
      this.errors = '';
      const params = new HttpParams()
        .set('NAME', this.validationForm1.value.name)
        .set('EMAIL', this.validationForm1.value.email)
        .set('b_c789d045d87cc22bd9756a879_cf5d252aa7', '');
      const mailChimpUrl = this.mailChimpEndpoint + params.toString();
      // 'c' refers to the jsonp callback param key. This is specific to Mailchimp
      this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(
        response => {
        if (response.result && response.result !== 'error') {
        } else {
          this.errors = response.msg;
        }
      }, error => {
        console.error(error);
        this.errors = 'Sorry, an error occurred.';
      });
    }

    this.isForm3Submitted = true;
  }


  /** Get values from both forms and join them together */
  getData(): any {
    return Object.assign(this.validationForm1.value, this.validationForm2.value, this.validationForm3.value);
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

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
