import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';

// User interface
export class User {
  // tslint:disable-next-line:ban-types
  name: String | undefined;
  // tslint:disable-next-line:ban-types
  email: String | undefined;
  telephone: any;
  // tslint:disable-next-line:ban-types
  adresse: String | undefined;
  // tslint:disable-next-line:variable-name
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private authstate: AuthStateService,
    private router: Router
  ) { }

  protected  baseUrl: string = environment.apiURL;

  // User registration
  // tslint:disable-next-line:no-shadowed-variable
  register(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', user);
  }

  /**
   * Logout
   */
  // tslint:disable-next-line:typedef
  onLogout() {
    this.authstate.setAuthState(false);
    localStorage.removeItem('access_token');
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
    }
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.baseUrl + 'users/user-profile');
  }

}

