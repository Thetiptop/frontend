import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AuthStateService} from './auth-state.service';
import {SocialAuthService, SocialUser} from "angularx-social-login";

// Interface
export interface User {
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

export interface UserSocialLogin {
  id: number;
  name: string;
  email: string;
  provider: string;
}

export interface UserSocialRegister {
  id: number;
  name: string;
  email: string;
  provider: string;
  canLegalyPlay: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  activeUrl: any;
  isSignedIn: boolean;
  error: any;
  user: SocialUser;
  loggedInWithSocial: boolean;
  protected baseUrl: string = environment.apiURL;
  protected loginBaseUrl: string = environment.loginApiURL;
  protected registerApiUrl: string = environment.registerApiUrl;

  constructor(
    private http: HttpClient,
    private authstate: AuthStateService,
    private router: Router,
    private authService: SocialAuthService
  ) {
  }

  register(user: User): Observable<any> {
    return this.http.post(this.registerApiUrl, user);
  }

  signin(user: User): Observable<any> {
    return this.http.post<any>(this.loginBaseUrl, user);
  }

  socialAuthLogin(User: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/login_with_socialite', User);
  }

  socialAuthRegister(User: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/register_with_socialite', User);
  }

  onLogout(): void {
    this.authstate.setAuthState(false);

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedInWithSocial = (user != null);
    });

    if (this.user !== null) {
      this.authService.signOut(true);
      sessionStorage.clear();
    }

    window.location.reload();
    localStorage.removeItem('access_token');
  }

  profileUser(): Observable<any> {
    return this.http.get(this.baseUrl + '/user-profile');
  }

}
