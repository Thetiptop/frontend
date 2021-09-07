import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../../../../core/authentification/confirm-validator';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ChangePasswordService } from '../../../../core/password/change-password.service';
import { NotificationComponent } from '../../../components/notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mot-de-passe',
  templateUrl: './mot-de-passe.component.html',
  styleUrls: ['./mot-de-passe.component.scss']
})
export class MotDePasseComponent implements OnInit {
  // SEO variables
  title = 'Modifer le mot de passe - ThéTipTop';
  description = 'Mise à jour du mot de passe de l\'utilisateur';

  success: any;
  errors: any;
  isSignedIn: any;
  error: any;
  modifierMotdepasseForm: FormGroup;
  isFormSubmitted: boolean;
  protected baseUrl: string = environment.apiURL;
  popUpMessage: any;


  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private http: HttpClient,
    private changePasswordService: ChangePasswordService,
    private modalService: NgbModal
  ) { }

  get form(): any {
    return this.modifierMotdepasseForm.controls;
  }

  open(): any {
    const modalRef = this.modalService.open(NotificationComponent, { centered: true });
    modalRef.componentInstance.message = this.popUpMessage;
  }


  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({property: 'og:title', content: this.title});
    this.metaTagService.updateTag({property: 'og:description', content: this.description});
    this.metaTagService.updateTag({name: 'description', content: 'Mise à jour du mot de passe de l\'utilisateur' });

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
    if (this.modifierMotdepasseForm.valid) {
      this.changePasswordService.changePassword(this.modifierMotdepasseForm.value).subscribe(
        result => {
          this.success = result;
          this.popUpMessage = this.success.message;
          this.open();
        },
        error => {
          this.errors = error;
          this.popUpMessage = this.errors.error.message;
          this.open();
        }
      );
    }
    this.isFormSubmitted = true;
  }

}
