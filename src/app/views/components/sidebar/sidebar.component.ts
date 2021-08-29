import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '../../../core/authentification/auth-state.service';
import { AuthService } from '../../../core/authentification/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSignedIn: boolean;

  constructor(
    private authstate: AuthStateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    /**
     * Checking the authentication State of the user. (True or False)
     */
    this.authstate.userAuthState.subscribe(val => {
      this.isSignedIn = val;
      console.log(val);
    });
  }

  /**
   * Logout
   */
  // tslint:disable-next-line:typedef
  onLogout(e: any) {
    this.authstate.setAuthState(false);
    this.authService.onLogout(e);
  }
}
