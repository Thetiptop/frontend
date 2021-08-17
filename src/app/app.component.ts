import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgcCookieConsentService, NgcNoCookieLawEvent, NgcStatusChangeEvent} from 'ngx-cookieconsent';
import {Subscription} from 'rxjs';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import { Meta } from '@angular/platform-browser';
import {CanonicalService} from './core/shared/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private ccService: NgcCookieConsentService,
              private metaTagService: Meta,
              private canonicalService: CanonicalService,
              public http: HttpClient) {
  }

  ngOnInit(): void {
    // SEO
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Jeu concours, jeu, thé, ThéTipTop' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' },
    ]);
    this.canonicalService.setCanonicalURL();
  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnDestroy(): void {
  }

}
