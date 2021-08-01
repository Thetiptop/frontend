import { Component, OnInit } from '@angular/core';
import {AuthStateService} from '../../../../core/auth-state.service';
import {AuthService} from '../../../../core/auth.service';

@Component({
  selector: 'app-mes-informations',
  templateUrl: './mes-informations.component.html',
  styleUrls: ['./mes-informations.component.scss']
})
export class MesInformationsComponent implements OnInit {
  activeUrl: any;
  UserProfile: any;
  isSignedIn: boolean;
  error: any;

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
    });

    /**
     * User profile data . If can't retrieve data : logout.
     */
    if (this.isSignedIn){
      this.authService.profileUser().subscribe(
        data => {
          this.UserProfile = data.detail;
        },
        err => {
          this.error = err.status;
          this.onLogout(event);
        });
    }
  }
  onLogout(e) {
    this.authstate.setAuthState(false);
    this.authService.onLogout(e);
  }

}
