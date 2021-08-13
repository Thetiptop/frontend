import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';


export class PasswordChange {
  // tslint:disable-next-line:variable-name
  old_password: any;
  // tslint:disable-next-line:variable-name
  new_password: any;
  // tslint:disable-next-line:variable-name
  new_password_confirmation: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  protected  baseUrl: string = environment.apiURL;

  constructor(
    private http: HttpClient,

  ) { }

  changePassword(password: PasswordChange): Observable<any> {
    return this.http.post(this.baseUrl + '/update_password', password);
  }
}
