import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  error: any;
  protected baseUrl: string = environment.apiURL;
  private issuer = {
    login: environment.loginApiURL,
    register: environment.registerApiUrl,
    socialLogin: environment.socialLogin,
    socialRegister: environment.socialRegister,
  };

  constructor() {
  }

  handleData(token): any {
    localStorage.setItem('access_token', token);
  }

  getToken(): any {
    return localStorage.getItem('access_token');
  }

  payload(token): any {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  isValidToken(): any {
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

  isLoggedIn(): any {
    return this.isValidToken();
  }

  removeToken(): any {
    localStorage.removeItem('access_token');
  }

}
