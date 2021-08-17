import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/authentification/auth.service';
import {AuthStateService} from '../../../../core/authentification/auth-state.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-mes-informations',
  templateUrl: './mes-informations.component.html',
  styleUrls: ['./mes-informations.component.scss']
})
export class MesInformationsComponent implements OnInit {
  // SEO variables
  title = 'Mes informations - ThéTipTop';

  isSignedIn: any;
  UserProfile: any;
  error: any;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private authService: AuthService,
    private authState: AuthStateService,
  ) { }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      {name: 'description', content: 'Description'}
    );

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
