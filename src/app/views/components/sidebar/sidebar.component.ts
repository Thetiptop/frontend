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

  menu = [
    {
      name: 'Accueil',
      link: '/accueil',
    },
    {
      name: 'Jouer',
      link: '/play',
      class: 'text-muted',
      placement: 'right',
      ngbPopover: 'Veuillez vous identifier'
    },
    {
      name: 'Profile',
      link: '/profile',
      class: 'text-muted',
      placement: 'right',
      ngbPopover: 'Veuillez vous identifier',
    },
    {
      name: 'A Propos',
      link: '/about',
    }
  ];

  menu2 = [
    {
      name: 'S\'identifier',
      link: '/login',
      class: 'fas fa-sign-in-alt',
    },
    {
      name: 'Jouer',
      link: '/play',
      class: 'fas fa-shopping-cart',
    },
/*    {
      name: 'S\'inscrire',
      link: '/register',
      class: 'fas fa-user-plus',
    },
    {
      name: 'Profile',
      link: '/profile',
      class2: 'fas fa-user-circle',
    }*/
  ];


  ngOnInit(): void {
    this.authstate.userAuthState.subscribe(val => {
      this.isSignedIn = val;
      console.log(val);
    });
  }

  onLogout(e: any): void {
    this.authstate.setAuthState(false);
    this.authService.onLogout(e);
  }
}
