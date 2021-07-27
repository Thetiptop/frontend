import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  trigger,
  transition,
  style,
  query,
  // group,
  // animateChild,
  animate,
  // keyframes,
} from '@angular/animations';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [trigger('myAnimation', [
    transition('* => *', [
      // The query function has three params.
      // First is the event, so this will apply on entering or when the element is added to the DOM.
      // Second is a list of styles or animations to apply.
      // Third we add a config object with optional set to true, this is to signal
      // angular that the animation may not apply as it may or may not be in the DOM.
      query(':enter', [style({ opacity: 0 })], { optional: true }),
      /*query(
        ':leave',
        // here we apply a style and use the animate function to apply the style over 0.3 seconds
        [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
        { optional: true }
      ),*/
      query(
        ':enter',
        [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
        { optional: true }
      )
    ])
  ])]
})

export class AboutComponent implements OnInit {
  links = [
    { title: 'Conditions générales', fragment: 'cgu' },
    { title: 'Mentions légales', fragment: 'mentions-legales' },
    { title: 'Confidentialité', fragment: 'confidentiality' },
    { title: 'Cookies', fragment: 'cookies' }
  ];

  public activeUrl: any;

  constructor(public route: ActivatedRoute) {
    route.url.subscribe(() => {
      // @ts-ignore
      this.activeUrl = route.snapshot.firstChild.url[0].path;
      });
  }

  ngOnInit(): void {
  }

}
