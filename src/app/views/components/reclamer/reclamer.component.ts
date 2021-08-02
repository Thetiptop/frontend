import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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
  @Input() lotName;
  @Input() lotId;
  @Input() userName;
  @Input() userId;
  @Input() phone;
  @Input() address;
  @Input() additionalAddress;
  @Input() postalCode;
  @Input() ville;
  showForm: boolean;
  wantToChangeAddress: boolean;
  reclamerForm: FormGroup;
  isFormSubmitted: boolean;
  formData: any;
  queryString: string;
  formData2: any;
  error: any;
  random: any;

  constructor(public activeModal: NgbActiveModal) {
  }

  get form() {
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

    /*
   Import User data service
   If don't want to change address ( if wanttochangeaddress = false ) , append values from user service to the form and send
   If want to change address ( if wanttochangeaddress = true ), then proceeds to a normal form completion from user
*/
      if (this.wantToChangeAddress) {
        console.log(this.wantToChangeAddress + 'wantToChangeAddress');

        this.formData = new FormData();
        this.formData2 = new FormData();

        this.formData.append('user_id', this.userId); // ADD ID
        this.formData.append('telephone', this.reclamerForm.value.telephone);

        this.formData2.append('complement_address', this.reclamerForm.value.complement_address);
        this.formData2.append('postal_code', this.reclamerForm.value.postal_code);
        this.formData2.append('ville', this.reclamerForm.value.ville);
        this.queryString = new URLSearchParams(this.formData2).toString();

        this.formData.append('lieu_livraison', this.queryString);

        for (const pair of this.formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
    }
      else {
      console.log(this.wantToChangeAddress + ' Dont wantToChangeAddress');

      this.formData = new FormData();
      this.formData2 = new FormData();

      this.formData.append('user_id', this.userId); // ADD ID
      this.formData.append('telephone', this.phone);

      this.formData2.append('address', this.address);
      this.formData2.append('complement_address', this.additionalAddress);
      this.formData2.append('postal_code', this.postalCode);
      this.formData2.append('ville', this.ville);
      this.queryString = new URLSearchParams(this.formData2).toString();

      this.formData.append('lieu_livraison', this.queryString);

      for (const pair of this.formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      /*this.reclamerService.reclameerSendForm(this.formData).subscribe(
        result => {
          this.success = result.success;
        },
        error => {
          this.errors = error.error.error;
          // console.log(this.errors);
        }
      );*/
    }
  }

  onSubmit() {
    console.log(this.wantToChangeAddress);
    // this.isFormSubmitted = true;
  }
}

