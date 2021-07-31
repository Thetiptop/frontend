import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modifier-informations',
  templateUrl: './modifier-informations.component.html',
  styleUrls: ['./modifier-informations.component.scss']
})
export class ModifierInformationsComponent implements OnInit {
  modifierProfileForm: FormGroup;
  isFormSubmitted: boolean;

  constructor() {
  }

  // tslint:disable-next-line:typedef
  get form() {
    console.log(this.modifierProfileForm.controls);
    return this.modifierProfileForm.controls;
  }

  ngOnInit(): void {
    this.modifierProfileForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      telephone: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      address: new FormControl(null, Validators.required),
      complement_address: new FormControl(null, Validators.required),
      code_postal: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{5}$')]),
      ville: new FormControl(null, Validators.required),
    });
    this.isFormSubmitted = false;

  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.modifierProfileForm.value);
    console.log(this.modifierProfileForm.controls);
    if (this.modifierProfileForm.valid) {
      console.log(this.modifierProfileForm.value);
    }
    this.isFormSubmitted = true;
  }
}
