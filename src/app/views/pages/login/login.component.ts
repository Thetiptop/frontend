import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../../core/authentification/auth.service';
import {TokenService} from '../../../core/authentification/token.service';
import {AuthStateService} from '../../../core/authentification/auth-state.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
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

  }

  onSubmit() {
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

}
