import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WizardComponent as BaseWizardComponent} from 'angular-archwizard';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  isForm1Submitted: boolean | undefined;
  isForm2Submitted: boolean | undefined;
  errors: any;
  success: any;
  display = true;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent | undefined;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router) {
  }

  /**
   * Returns form
   */
  // tslint:disable-next-line:typedef
  get form1() {
    // @ts-ignore
    console.log(this.validationForm1.controls);
    // @ts-ignore
    return this.validationForm1.controls;
  }

  /**
   * Returns form
   */
  // tslint:disable-next-line:typedef
  get form2() {
    // @ts-ignore
    return this.validationForm2.controls;
  }

  // tslint:disable-next-line:typedef
  form2Submit() {
    // @ts-ignore
    if (this.validationForm2.valid) {
      this.authService.register(this.getData()).subscribe(
        result => {
          this.success = result.success;
          this.display = false;
        },
        error => {
          this.errors = error.error.error;
          console.log(this.errors);
        },
        () => {
          // @ts-ignore
          this.wizardForm.goToNextStep();
        }
      );
    }
    this.isForm2Submitted = true;
  }

  ngOnInit(): void {

    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
    });

    /**
     * form value validation
     */
    this.validationForm2 = this.formBuilder.group({
      adresse: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
  }

  /**
   * Go to next step 2 while form value is valid
   */
  // tslint:disable-next-line:typedef
  form1Submit() {
    // @ts-ignore
    if (this.validationForm1.valid) {
      // @ts-ignore
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  /**
   * Get values from both forms and join them together
   */
  // tslint:disable-next-line:typedef
  getData() {
    // tslint:disable-next-line:prefer-const
    // @ts-ignore
    const merged = Object.assign(this.validationForm1.value, this.validationForm2.value);
    console.log(merged);
    return merged;
  }

  // tslint:disable-next-line:typedef
  goToLogin() {
    this.router.navigate(['/login']);
  }

}

