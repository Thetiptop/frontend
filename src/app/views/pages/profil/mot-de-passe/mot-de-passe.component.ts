import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../core/authentification/confirm-validator';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ChangePasswordService} from '../../../../core/password/change-password.service';

@Component({
  selector: 'app-mot-de-passe',
  templateUrl: './mot-de-passe.component.html',
  styleUrls: ['./mot-de-passe.component.scss']
})
export class MotDePasseComponent implements OnInit {
  success: any;
  errors: any;
  isSignedIn: any;
  error: any;
  modifierMotdepasseForm: FormGroup;
  isFormSubmitted: boolean;
  protected  baseUrl: string = environment.apiURL;


  constructor(
    private http: HttpClient,
    private changePasswordService: ChangePasswordService,
  ) { }

  get form(): any {
    // console.log(this.modifierMotdepasseForm.controls);
    return this.modifierMotdepasseForm.controls;
  }


  ngOnInit(): void {
    this.modifierMotdepasseForm = new FormGroup({
      old_password: new FormControl(null, Validators.required),
      new_password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      new_password_confirmation: new FormControl(null, Validators.required),
    }, {
      // @ts-ignore
        validator: ConfirmedValidator('new_password', 'new_password_confirmation')
    });
    this.isFormSubmitted = false;
  }

  onSubmit(): void {
    // console.log(this.modifierMotdepasseForm.value);
    // console.log(this.modifierMotdepasseForm.controls);
    if (this.modifierMotdepasseForm.valid) {
      // console.log(this.modifierMotdepasseForm.value);
      this.changePasswordService.changePassword(this.modifierMotdepasseForm.value).subscribe(
        result => {
          this.success = result;
          console.log(this.success.message);
        },
        error => {
          this.errors = error.error;
          console.log(this.errors);

        }
      );
    }
    this.isFormSubmitted = true;
  }

}
