import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '../../../core/password/reset-password.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errors: any;
  success: any;
  display = true;
  isFormSubmitted: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ){}

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
      this.resetPasswordService.resetPassword(this.resetForm.value).subscribe(
        result => {
          this.success = result;
          console.log(result);
          this.resetForm.reset();
        },
        error => {
          this.errors = error.error.message;
          console.log(error);
        }
      );
    }
    this.isFormSubmitted = true;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}

