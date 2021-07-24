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
  errors: any;
  isFormSubmitted: boolean | undefined;
  private success: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
  }

  // tslint:disable-next-line:typedef
  get form() {
    // @ts-ignore
    console.log(this.loginForm.controls);
    // @ts-ignore
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]),
      password: new FormControl(null, Validators.required)
    });
    this.isFormSubmitted = false;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // @ts-ignore
    if (this.loginForm.valid) {
      // @ts-ignore
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.success = result;
          this.responseHandler(result.token);
          this.authState.setAuthState(true);
          // @ts-ignore
          this.loginForm.reset();
        },
        res => {
          this.errors = res.error.error;
        }
      );
    }
    this.isFormSubmitted = true;
  }

  // Handle response
  // tslint:disable-next-line:typedef
  responseHandler(data: any) {
    this.token.handleData(data);
  }

}
