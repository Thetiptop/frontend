import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { AuthService } from '../../../core/authentification/auth.service';
import { ConfirmedValidator } from '../../../core/authentification/confirm-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  errors: any;
  success: any;
  display = true;

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent | undefined;
  formData: FormData;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {

  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}

