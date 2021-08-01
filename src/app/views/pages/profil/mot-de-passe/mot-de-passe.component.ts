import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../core/authentification/confirm-validator';

@Component({
  selector: 'app-mot-de-passe',
  templateUrl: './mot-de-passe.component.html',
  styleUrls: ['./mot-de-passe.component.scss']
})
export class MotDePasseComponent implements OnInit {
  modifierMotdepasseForm: FormGroup;
  isFormSubmitted: boolean;

  constructor() { }

  get form() {
    console.log(this.modifierMotdepasseForm.controls);
    return this.modifierMotdepasseForm.controls;
  }


  ngOnInit(): void {
    this.modifierMotdepasseForm = new FormGroup({
      old_password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      new_password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl(null, Validators.required),
    }, {
      // @ts-ignore
        validator: ConfirmedValidator('new_password', 'password_confirmation')
    });
    this.isFormSubmitted = false;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.modifierMotdepasseForm.value);
    console.log(this.modifierMotdepasseForm.controls);
    if (this.modifierMotdepasseForm.valid) {
      console.log(this.modifierMotdepasseForm.value);
    }
    this.isFormSubmitted = true;
  }

}
