import { Component, OnInit } from '@angular/core';

import {
  transition,
  trigger,
  query,
  style,
  animate,
  // group,
  // animateChild
} from '@angular/animations';
import {Meta} from '@angular/platform-browser';

@Component({

  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
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

export class BaseComponent implements OnInit {

  constructor(
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.metaTagService.addTags([
      { name: 'keywords', content: 'ThéTipTop, Jeu concours, Jeu, Thé' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }

}
