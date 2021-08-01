import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../../core/auth.service';
import {TokenService} from '../../../core/token.service';
import {AuthStateService} from '../../../core/auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: any;
  success: any;
  errors: any;
  isFormSubmitted: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
  }

  get form() {
    console.log(this.loginForm.controls);
    return this.loginForm.controls;
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.isFormSubmitted = false;

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.success = result;
          console.log(result);
          this.responseHandler(result.access_token);
          this.authState.setAuthState(true);
          console.log(this.token.isValidToken());
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

  // Handle response
  // tslint:disable-next-line:typedef
  // @ts-ignore
  responseHandler(data) {
    this.token.handleData(data);
  }

}
