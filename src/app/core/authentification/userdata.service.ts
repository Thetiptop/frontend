import { Injectable, OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  activeUrl: any;
  UserProfile: any;
  isSignedIn: boolean;
  error: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  protected  baseUrl: string = environment.apiURL;
  protected  loginBaseUrl: string = environment.loginApiURL;
  protected  registerApiUrl: string = environment.registerApiUrl;

  getUserData() {
    return this.http.get(this.baseUrl + '/user-profile');
  }
}

