import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../core/authentification/confirm-validator';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ChangePasswordService} from '../../../../core/password/change-password.service';
import {NotificationComponent} from '../../../components/notification/notification.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  popUpMessage: any;


  constructor(
    private http: HttpClient,
    private changePasswordService: ChangePasswordService,
    private modalService: NgbModal
  ) { }

  get form(): any {
    return this.modifierMotdepasseForm.controls;
  }

  open(): any {
    const modalRef = this.modalService.open(NotificationComponent, {centered: true} );
    modalRef.componentInstance.message = this.popUpMessage;
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
          console.log('oops', error);
          console.log(this.popUpMessage);
          this.open();
        }/*,
        () => {
          this.open();
        }*/
      );
    }
    this.isFormSubmitted = true;
  }

}
