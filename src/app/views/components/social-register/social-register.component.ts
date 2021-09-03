import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {AuthStateService} from "../../../core/authentification/auth-state.service";
import {TokenService} from "../../../core/authentification/token.service";
import {AuthService} from "../../../core/authentification/auth.service";

@Component({
  selector: 'app-social-register',
  templateUrl: './social-register.component.html',
  styleUrls: ['./social-register.component.scss']
})
export class SocialRegisterComponent implements OnInit {
  SocialRegisterForm: FormGroup;
  isFormSubmitted: boolean;
  socialUser: SocialUser;
  socialResult: any;
  socialError: any;
  @Input() wantToRegisterWithGoogle;
  @Input() wantToRegisterWithFacebook;
  formData: FormData;


  constructor(private http: HttpClient,
              public formBuilder: FormBuilder,
              private router: Router,
              public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              public authService: AuthService,
              private token: TokenService,
              private authState: AuthStateService,
              private socialAuthService: SocialAuthService,) {
  }

  get form(): any {
    return this.SocialRegisterForm.controls;
  }

  ngOnInit(): void {

    this.SocialRegisterForm = new FormGroup({
      canLegalyPlay: new FormControl(null, Validators.requiredTrue)
    });

    this.isFormSubmitted = false;

  }

  onSubmit(): void {
    if (this.SocialRegisterForm.valid) {

      this.socialAuthService.authState.subscribe(
        (user) => {
          this.socialUser = user;
          this.formData = new FormData();
          this.formData.append('name', this.socialUser.name);
          this.formData.append('email', this.socialUser.email);
          this.formData.append('id', this.socialUser.id);
          this.formData.append('provider', this.socialUser.provider);

          if (this.SocialRegisterForm.value.canLegalyPlay) {
            this.formData.append('canLegalyPlay', '1');

            this.authService.socialAuthRegister(this.formData).subscribe(
              (res) => {
                this.socialResult = res;
                console.log(res);
                this.token.handleData(this.socialResult.token);
                this.authState.setAuthState(true);
                this.router.navigate(['/play']);
              }, (err) => {
                console.log(err);
                this.socialError = err;
              }
            );

          }

        }
      );
      this.activeModal.dismiss('Cross click')
    }
    this.isFormSubmitted = true;
  }

  clearSocialData(): void {
    this.authService.onLogout();
    // window.location.reload();
  }

}
