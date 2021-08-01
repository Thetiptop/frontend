import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WizardComponent as BaseWizardComponent} from 'angular-archwizard';
import {AuthService} from '../../../core/auth.service';
import {ConfirmedValidator} from '../../../core/confirm-validator';

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

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent | undefined;
  formData: FormData;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router) {
  }

  // Returns form controls
  get form1() {
    return this.validationForm1.controls;
  }

  // Returns form controls
  get form2() {
    return this.validationForm2.controls;
  }

  // Returns form controls
  get form3() {
    return this.validationForm3.controls;
  }

  ngOnInit(): void {

    /** form1 value validation */
    this.validationForm1 = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      telephone: ['',  [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    });

    /** form2 value validation */
    this.validationForm2 = this.formBuilder.group({
      address: ['', Validators.required],
      additional_address: ['', Validators.required],
      postal_code: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      ville: ['', Validators.required],
    });

    /** form3 value validation */
    this.validationForm3 = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
      cgu: [false, Validators.requiredTrue],
      major: [false, Validators.requiredTrue]
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
    this.isForm3Submitted = false;
  }

  /**  Go to next step 2 while form value is valid */
  form1Submit() {
    if (this.validationForm1.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  /** Go to next step 3 while form value is valid */
  form2Submit() {
    if (this.validationForm2.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm2Submitted = true;
  }

  /** Go to register while form 3 value is valid */
  form3Submit() {
    console.log(this.validationForm3.controls);
    // @ts-ignore
    console.log('this.validationForm3.password = ' + this.validationForm3.password);
    if (this.validationForm3.valid) {
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
          this.wizardForm.goToNextStep();
        }
      );
    }
    this.isForm3Submitted = true;
  }


  /** Get values from both forms and join them together */
  getData() {
    const merged = Object.assign(this.validationForm1.value, this.validationForm2.value, this.validationForm3.value);
    return merged;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}

