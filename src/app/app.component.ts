import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgcCookieConsentService, NgcNoCookieLawEvent, NgcStatusChangeEvent} from 'ngx-cookieconsent';
import {Subscription} from 'rxjs';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TTT';

  constructor(private ccService: NgcCookieConsentService) {
  }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnDestroy(): void {
  }
}
