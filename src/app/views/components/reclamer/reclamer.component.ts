import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {NotificationComponent} from '../notification/notification.component';
import {Router} from '@angular/router';


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
  error: any;
  random: any;
  success: any;
  baseUrl: string = environment.apiURL;
  errors: any;
  popUpMessage: any;

  constructor(private http: HttpClient,
              private router: Router,
              public activeModal: NgbActiveModal,
              private modalService: NgbModal
  ) {
  }

  open(): void {
    const modalRef = this.modalService.open(NotificationComponent, {centered: true} );
    modalRef.componentInstance.message = this.popUpMessage;
  }

  get form(): any {
    return this.reclamerForm.controls;
  }

  toggleDisplay(): void {
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

    if (this.wantToChangeAddress) {
        this.formData = new FormData();
        this.formData.append('user_id', this.userId);
        this.formData.append('history_id', this.lotId);
        this.formData.append('phone', this.reclamerForm.value.telephone);
        this.formData.append('lieu_livraison',
            'Addresse = ' + this.reclamerForm.value.address + '?' +
            'Complément addresse = ' + this.reclamerForm.value.complement_address + '?' +
            'Code postal = ' + this.reclamerForm.value.postal_code + '?' +
            'Ville =' + this.reclamerForm.value.ville
        );
    }
    else {
      this.formData = new FormData();
      this.formData.append('user_id', this.userId);
      this.formData.append('history_id', this.lotId);
      this.formData.append('phone', this.phone);
      this.formData.append('lieu_livraison',
        'Addresse = ' + this.address + '?' +
        'Complément addresse = ' + this.additionalAddress + '?' +
        'Code postal = ' + this.postalCode + '?' +
        'Ville = ' + this.ville
      );
    }

  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit(): void {
    if (this.wantToChangeAddress){
      if (this.reclamerForm.valid){
        this.http.post((this.baseUrl + '/reclamation/'), this.formData).subscribe(
          result => {
            this.success = result;
            console.log(this.success);
            this.popUpMessage = 'Votre lot vous sera envoyé !';
            this.reloadCurrentRoute();
          },
          error => {
            this.errors = error.error.message;
            console.log('Hello ' + error.error.message);
            this.popUpMessage = this.errors;
          },
          () => {
            this.open();
          }
        );
        this.modalService.dismissAll();
      }
    }
    if (!this.wantToChangeAddress){
      this.http.post((this.baseUrl + '/reclamation/'), this.formData).subscribe(
        result => {
          this.success = result;
          console.log(this.success);
          this.popUpMessage = 'Votre lot vous sera envoyé !';
          this.reloadCurrentRoute();
        },
        error => {
          this.errors = error.error.message;
          console.log('Hello ' + error.error.message);
          this.popUpMessage = this.errors;
        },
        () => {
          this.open();
        }
      );
      this.modalService.dismissAll();
    }
    this.isFormSubmitted = true;
  }
}



