import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgcCookieConsentService} from 'ngx-cookieconsent';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Meta} from '@angular/platform-browser';
import {CanonicalService} from './core/shared/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  description: any | string;
  title: any | string;

  constructor(private ccService: NgcCookieConsentService,
              private metaTagService: Meta,
              private canonicalService: CanonicalService,
              public http: HttpClient) {
  }

  ngOnInit(): void {
    // SEO
    this.metaTagService.addTags([
      {name: 'keywords', content: 'Jeu concours, jeu, thé, ThéTipTop'},
      {name: 'robots', content: 'index, follow'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {charset: 'UTF-8'},
      {name: 'description', content: this.description},
      {property: 'og:title', content: this.title},
      {name: 'og:description', content: this.description},
      {property: 'og:image', content: '/assets/mango-bg-.jpg'},
      {property: 'og:image:alt', content: this.title}
    ]);
    this.canonicalService.setCanonicalURL();
  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnDestroy(): void {
  }

}
