import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '../../../core/password/reset-password.service';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

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
  title = 'Mise à jour mot de passe - ThéTipTop';
  description = 'Vous avez oublié votre mot de passe ? Reinitialisez-le en cliquant sur le lien';

  constructor(
    public formBuilder: FormBuilder,
    private titleService: Title,
    private metaTagService: Meta,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ){}

  get form(): any {
    return this.resetForm.controls;
  }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({property: 'og:title', content: this.title});
    this.metaTagService.updateTag({property: 'og:description', content: this.description});
    this.metaTagService.updateTag({name: 'description', content: this.description});

    this.resetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    });

    this.isFormSubmitted = false;
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.resetPasswordService.resetPassword(this.resetForm.value).subscribe(
        result => {
          this.success = result.message;
        },
        error => {
          this.errors = error.error.message;
        }
      );
    }
    this.isFormSubmitted = true;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}

