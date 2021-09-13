import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/authentification/auth.service';
import { AuthStateService } from '../../../../core/authentification/auth-state.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { NotificationComponent } from '../../../components/notification/notification.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {Meta, Title} from '@angular/platform-browser';
import {Router} from "@angular/router";
import { DeleteConfirmComponent } from 'src/app/views/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-modifier-informations',
  templateUrl: './modifier-informations.component.html',
  styleUrls: ['./modifier-informations.component.scss']
})
export class ModifierInformationsComponent implements OnInit {
  // SEO variables
  title = 'Modifier le profil - ThéTipTop';
  description = 'Mise à jour des informations personnelles de l\'utilisateur';

  modifierProfileForm: FormGroup;
  isFormSubmitted: boolean;
  UserProfile: any;
  success: any;
  errors: any;
  isSignedIn: any;
  error: any;
  protected  baseUrl: string = environment.apiURL;
  popUpMessage: string;
  modalRef: any;
  id_user: any;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private authState: AuthStateService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(): any {
    const modalRef = this.modalService.open(NotificationComponent, {centered: true} );
    modalRef.componentInstance.message = this.popUpMessage;
  }

  open2(): void {
    this.modalRef = this.modalService.open(DeleteConfirmComponent, {centered: true} );
    this.modalRef.componentInstance.id_user = this.id_user;
  }


  get form(): any {
    return this.modifierProfileForm.controls;
  }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({property: 'og:title', content: this.title});
    this.metaTagService.updateTag({property: 'og:description', content: this.description});
    this.metaTagService.updateTag({name: 'description', content: this.description});

    this.authState.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });

    if (this.isSignedIn){
      this.authService.profileUser().subscribe(
        data => {
          this.id_user = data.detail.id;
          this.UserProfile = data.detail;
          this.modifierProfileForm.patchValue({
            name: this.UserProfile.name,
            telephone: this.UserProfile.telephone,
            address: this.UserProfile.address,
            additional_address: this.UserProfile.additional_address,
            postal_code: this.UserProfile.postal_code,
            ville: this.UserProfile.ville
          });
        },
        err => {
          this.error = err.status;
          this.authService.onLogout();
        });
    }

    this.modifierProfileForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ])?[a-zA-ZÀ-ÿ]*)*$/)]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      address: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9À-ÿ\s,]+(([',. -][a-zA-Z0-9À-ÿ\s,])?[a-zA-Z0-9À-ÿ\s,]*)*$/)]),
      additional_address: new FormControl(null, Validators.pattern(/^[a-zA-Z0-9À-ÿ\s,]+(([',. -][a-zA-Z0-9À-ÿ\s,])?[a-zA-Z0-9À-ÿ\s,]*)*$/)),
      postal_code: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{5}$')]),
      ville: new FormControl(null, Validators.pattern(/^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ])?[a-zA-ZÀ-ÿ]*)*$/)),
    });
    this.isFormSubmitted = false;
  }

  onSubmit(): void {
    if (this.modifierProfileForm.valid) {
      this.http.post((this.baseUrl + '/user/update/' + this.UserProfile.id), this.modifierProfileForm.value).subscribe(
        result => {
          this.success = result;
          this.popUpMessage = 'Les modifications ont bien été pris en compte';
        },
        error => {
          this.errors = error.error.error;
          this.popUpMessage = 'Erreur';
        },
        () => {
          this.open();
        }
      );
    }
    this.isFormSubmitted = true;
  }
}
