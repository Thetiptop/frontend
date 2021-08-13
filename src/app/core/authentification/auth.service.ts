import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';

// User interface
export class User {
  id: number;
  name: string;
  email: string;
  telephone: any;
  address: string;
  complement_address: any;
  postal_code: any;
  ville: string;
  password: string;
  password_confirmation: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  activeUrl: any;
  isSignedIn: boolean;
  error: any;

  constructor(
    private http: HttpClient,
    private authstate: AuthStateService,
    private router: Router,
  ) { }

  protected  baseUrl: string = environment.apiURL;
  protected  loginBaseUrl: string = environment.loginApiURL;
  protected  registerApiUrl: string = environment.registerApiUrl;

  register(user: User): Observable<any> {
    return this.http.post(this.registerApiUrl, user);
  }

  signin(user: User): Observable<any> {
    return this.http.post<any>(this.loginBaseUrl, user);
  }

  onLogout(e): void {
    e.preventDefault();
    this.authstate.setAuthState(false);
    localStorage.removeItem('access_token');

    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
    }
  }

  profileUser(): Observable<any> {
    return this.http.get(this.baseUrl + '/user-profile');
  }

}

