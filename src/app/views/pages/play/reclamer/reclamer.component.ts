import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// Import User data service
// Import Reclamer Services data service


@Component({
  selector: 'app-reclamer',
  templateUrl: './reclamer.component.html',
  styleUrls: ['./reclamer.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({height: 0, opacity: 0}),
            animate('1s ease-out',
              style({height: 50, opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({height: 50, opacity: 1}),
            animate('1s ease-in',
              style({height: 0, opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class ReclamerComponent implements OnInit {

  @Input() name;
  @Input() id;
  showForm: boolean;
  wantToChangeAddress: boolean;

  reclamerForm: FormGroup;

  isFormSubmitted: boolean;
  formData: any;

  constructor(public activeModal: NgbActiveModal) {
  }

  get form() {
    console.log(this.reclamerForm.controls);
    return this.reclamerForm.controls;
  }

  toggleDisplay() {
    this.showForm = !this.showForm;
    this.wantToChangeAddress = !this.wantToChangeAddress;
  }

  ngOnInit(): void {
    this.reclamerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      telephone: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      address: new FormControl(null, Validators.required),
      complement_address: new FormControl(null, Validators.required),
      code_postal: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{5}$')]),
      ville: new FormControl(null, Validators.required),
    });
    this.showForm = false;
    this.wantToChangeAddress = false;
    this.isFormSubmitted = false;
  }

  // Import User data service
  // If don't want to change address ( if wanttochangeaddress = false ) , append values from user service to the form and send
  // If want to change address ( if wanttochangeaddress = true ), then proceeds to a normal form completion from user


  onSubmit() {
    if (this.wantToChangeAddress) {
      if (this.reclamerForm.valid) {
        console.log(this.wantToChangeAddress + 'wantToChangeAddress');
      }
    }
      else {
      console.log(this.wantToChangeAddress + ' Dont wantToChangeAddress');
      this.formData = new FormData();
      this.formData.append('name', 'this.user.name');
      this.formData.append('telephone', '0612182800');
      this.formData.append('complement_address', 'this.user.complement_address');
      this.formData.append('code_postal', '92220');
      this.formData.append('ville', 'this.user.ville');
      // Display the key/value pairs
      /*for (const pair of this.formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }*/
      if (this.reclamerForm.valid) {
        console.log(this.reclamerForm.controls);
        /*this.reclamerService.reclameerSendForm(this.formData).subscribe(
          result => {
            this.success = result.success;
          },
          error => {
            this.errors = error.error.error;
            console.log(this.errors);
          }
        );*/
      }
    }
    this.isFormSubmitted = true;
  }
}
