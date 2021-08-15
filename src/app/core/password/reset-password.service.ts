import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';


export class Email {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  protected  baseUrl: string = environment.apiURL;

  constructor(
    private http: HttpClient,

  ) { }

  resetPassword(password: Email): Observable<any> {
    return this.http.post(this.baseUrl + '/forget_password', password);
  }
}
