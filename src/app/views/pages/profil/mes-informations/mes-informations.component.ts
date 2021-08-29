import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/authentification/auth.service';
import {AuthStateService} from '../../../../core/authentification/auth-state.service';

@Component({
  selector: 'app-mes-informations',
  templateUrl: './mes-informations.component.html',
  styleUrls: ['./mes-informations.component.scss']
})
export class MesInformationsComponent implements OnInit {
  isSignedIn: any;
  UserProfile: any;
  error: any;

  constructor(
    private authService: AuthService,
    private authState: AuthStateService,
  ) { }

  ngOnInit(): void {
    this.authState.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });

    if (this.isSignedIn){
      this.authService.profileUser().subscribe(
        data => {
          this.UserProfile = data.detail;
        },
        err => {
          this.error = err.status;
          this.authService.onLogout(event);
        });
    }
  }
}
