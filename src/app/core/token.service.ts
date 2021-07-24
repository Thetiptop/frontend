import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private issuer = {
    login: environment.loginApiURL,
    register: environment.registerApiUrl
  };

  error: any;
  UserProfile: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  protected baseUrl: string = environment.apiURL;

  handleData(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  payload(token: string) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // tslint:disable-next-line:typedef
  // @ts-ignore
  isValidToken() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
    } else {
      return false;
    }
  }

  getUserId() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        console.log(payload.sub);
      }
    }
  }

  isLoggedIn() {
    // this.getUserId();
     return this.isValidToken();

    /*if (localStorage.getItem("access_token")) {
      return true;
    } else {
      return false;
    }*/
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }

}
