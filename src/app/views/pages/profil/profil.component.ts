import {Component, OnInit} from '@angular/core';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  animations: [trigger('myAnimation', [
    transition('* => *', [
      // The query function has three params.
      // First is the event, so this will apply on entering or when the element is added to the DOM.
      // Second is a list of styles or animations to apply.
      // Third we add a config object with optional set to true, this is to signal
      // angular that the animation may not apply as it may or may not be in the DOM.
      query(':enter', [style({opacity: 0})], {optional: true}),
      /*query(
        ':leave',
        // here we apply a style and use the animate function to apply the style over 0.3 seconds
        [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
        { optional: true }
      ),*/
      query(
        ':enter',
        [style({opacity: 0}), animate('0.5s', style({opacity: 1}))],
        {optional: true}
      )
    ])
  ])]
})

export class ProfilComponent implements OnInit {
  title = 'Mon Profil';
  activeUrl: any;
  links = [
    {
      title: 'Historique',
      fragment: 'historique',
      icon: 'fa fa-history'
    },
    {
      title: 'Mes informations',
      fragment: 'mes-informations',
      icon: 'fas fa-user-circle'
    },
    {
      title: 'Modifer le Profil',
      fragment: 'modifier-informations',
      icon: 'fas fa-user-edit'
    },
    {
      title: 'Mot de Passe',
      fragment: 'mot-de-passe',
      icon: 'fas fa-fingerprint'
    },
  ];


  constructor(public route: ActivatedRoute
  ) {
    route.url.subscribe(() => {
      this.activeUrl = route.snapshot.firstChild.url[0].path;
    });
  }

  ngOnInit(): void {
  }
}
