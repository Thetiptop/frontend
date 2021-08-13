import { Component, OnInit } from '@angular/core';
import { timeUntil } from '@tobynatooor/countdown';
import {Router} from '@angular/router';
import {AuthStateService} from '../../../core/authentification/auth-state.service';
import {ReclamerComponent} from '../../components/reclamer/reclamer.component';
import {HowToPlayComponent} from '../../components/how-to-play/how-to-play.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalRef: any;
  isSignedIn: any;
  x: any;
  days: number;
  hours: number;
  seconds: number;
  minutes: number;

  constructor(
    private router: Router,
    private authState: AuthStateService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.authState.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });

    const x = timeUntil('2021-09-13T20:20:20');
    console.log(`${x.years}:${x.days % 365}:${x.hours % 24}:${x.minutes % 60}:${x.seconds % 60}`);
    this.days = x.days;
    this.hours = x.hours;
    this.minutes = x.hours;
    this.seconds = x.seconds;

  }

  redirect(): void {
    if (this.isSignedIn){
      this.router.navigate(['/play']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  open(): void {
      this.modalRef = this.modalService.open(HowToPlayComponent, {centered: true, size: 'md'});
  }
}

