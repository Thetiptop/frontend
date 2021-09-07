import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, query, style, transition, trigger,} from '@angular/animations';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Meta} from '@angular/platform-browser';
import {NgcCookieConsentService} from 'ngx-cookieconsent';
import {CanonicalService} from "./core/shared/canonical.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent implements OnInit, OnDestroy {
  title: 'Jeu Concours - ThéTipTop';
  description: 'Vous aussi vous pouvez gagner ! Gagnez un infuseur à thé, un thé detox, un thé signature ou un coffret découverte! 1 500 000 tickets disponibles!';

  constructor(private ccService: NgcCookieConsentService,
              private metaTagService: Meta,
              private canonicalService: CanonicalService,
              public http: HttpClient) {
  }

  ngOnInit(): void {
    // SEO
    this.metaTagService.addTags([
      {
        name: 'keywords', content: 'Jeu concours,' +
          ' jeu, thé, ThéTipTop,recettes de thés détox,' +
          'thés détox bio, thés détox zelda, ' +
          'thés détox intestin, thés blancs, ' +
          'les meilleurs thés blancs, meilleurs thés blancs, sortes de thés blancs,' +
          ' infusion,infusion thym, infusion gingembre, infusion de thym, infusion romarin,' +
          ' infusion menthe, infusion queue de cerise, infusion gingembre citron,' +
          'infusion camomille, infusion sauge, infusion verveine, infusion hibiscus,' +
          'infusion tilleul, infusion elephant, infusion detox'
      },
      {name: 'robots', content: 'index, follow'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {property: 'og:title', content: this.title},
      {property: 'og:description', content: this.description},
      {property: 'og:image', content: '/assets/images/mango-bg.jpg'},
      {property: 'og:image:alt', content: this.title},
     // {name: 'description', content: this.description},

    ]);
    this.canonicalService.setCanonicalURL();

  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnDestroy(): void {
  }

}

