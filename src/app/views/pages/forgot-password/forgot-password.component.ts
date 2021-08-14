import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errors: any;
  success: any;
  display = true;
  isFormSubmitted: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router) {
  }

  get form(): any {
    return this.resetForm.controls;
  }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    });

    this.isFormSubmitted = false;
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      /*this.resetPasswordService.signin(this.resetForm.value).subscribe(
        result => {
          this.success = result;
          console.log(result.access_token);
          this.resetForm.reset();
        },
        error => {
          this.errors = error.error.error;
        },
        () => {
          this.router.navigate(['/login']);
        }
      );*/
    }
    this.isFormSubmitted = true;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}

