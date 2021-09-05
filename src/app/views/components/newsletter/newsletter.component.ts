import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationComponent} from "../notification/notification.component";

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  newsletterForm: FormGroup;
  isFormSubmitted: boolean;
  error: any;
  success: any;
  baseUrl: string = environment.apiURL;
  popUpMessage: any;
  private mailChimpEndpoint = 'https://christaime.us7.list-manage.com/subscribe/post-json?u=c789d045d87cc22bd9756a879&amp;id=cf5d252aa7&';

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
    return this.newsletterForm.controls;
  }

  ngOnInit(): void {
    this.newsletterForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ])?[a-zA-ZÀ-ÿ]*)*$/)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    });

    this.isFormSubmitted = false;
  }


  onSubmit(): void {
    /** Mailchimp **/
    console.log(this.newsletterForm);
    if (this.newsletterForm.valid) {
      this.error = '';
      const params = new HttpParams()
        .set('NAME', this.newsletterForm.value.name)
        .set('EMAIL', this.newsletterForm.value.email)
        .set('b_c789d045d87cc22bd9756a879_cf5d252aa7', '');
      const mailChimpUrl = this.mailChimpEndpoint + params.toString();
      // 'c' refers to the jsonp callback param key. This is specific to Mailchimp
      this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(
        response => {
          if (response.result && response.result !== 'error') {
            this.popUpMessage = 'Vous êtes bien inscrit à notre newsletter !';
            this.modalService.dismissAll();
            this.open();
          } else {
            this.error = response.msg;
            this.popUpMessage = this.error;
            this.open();
          }
        }, error => {
          console.error(error);
          this.popUpMessage = 'Sorry, an error occurred.';
          this.open();
        }
        );
    }

    this.isFormSubmitted = true;
  }

}
