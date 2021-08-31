import {Component, Inject, NgZone, OnInit} from '@angular/core';
import { timeUntil } from '@tobynatooor/countdown';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../core/authentification/auth-state.service';
import { HowToPlayComponent } from '../../components/how-to-play/how-to-play.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  // SEO variables
  title = 'Jeu Concours - ThéTipTop';

  modalRef: any;
  isSignedIn: any;
  finalDate = '2021-09-13T00:00:00';
  days: any;
  hours: any;
  seconds: any;
  minutes: any;
  description: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private metaTagService: Meta,
    private router: Router,
    private authState: AuthStateService,
    private modalService: NgbModal,
    private zone: NgZone
  ) {

  }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({name: 'description', content: this.description});
    this.metaTagService.updateTag({property: 'og:title', content: this.title});
    this.metaTagService.updateTag({name: 'og:description', content: this.description});
    this.metaTagService.updateTag({property: 'og:image', content: '/assets/mango-bg-.jpg'});
    this.metaTagService.updateTag({property: 'og:image:alt', content: this.title});

    // User authentification state
    this.authState.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });

    const x = timeUntil(this.finalDate);
    this.days = `${x.days % 365}`;
    this.hours = `${x.hours % 24}`;
    this.minutes = `${x.minutes % 60}`;
    this.seconds = `${x.seconds % 60}`;

    if (isPlatformBrowser(this.platformId)) {
      //do something, only runs on the front end
      setInterval(() => {
        const y = timeUntil(this.finalDate);
        this.days = `${y.days % 365}`;
        this.hours = `${y.hours % 24}`;
        this.minutes = `${y.minutes % 60}`;
        this.seconds = `${y.seconds % 60}`;
      }, 1000)
    }

  }

  redirect(): void {
    if (this.isSignedIn){
      this.router.navigate(['/play']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  open(): void {
    this.modalRef = this.modalService.open(HowToPlayComponent, {centered: true});
  }
}

