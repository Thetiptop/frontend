import { Component, OnInit } from '@angular/core';
import { timeUntil } from '@tobynatooor/countdown';
import {Router} from '@angular/router';
import {AuthStateService} from '../../../core/authentification/auth-state.service';
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
  days: any;
  hours: any;
  seconds: any;
  minutes: any;

  constructor(
    private router: Router,
    private authState: AuthStateService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.authState.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });

    setInterval(() => {
      const x = timeUntil('2021-09-13T20:20:20');
      this.days = `${x.days % 365}`;
      this.hours = `${x.hours % 24}`;
      this.minutes = `${x.minutes % 60}`;
      this.seconds = `${x.seconds % 60}`;
    }, 1000);
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

