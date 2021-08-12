import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { timeUntil } from '@tobynatooor/countdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  x: any;
  days: number;
  hours: number;
  seconds: number;
  minutes: number;
  constructor() { }

  ngOnInit(): void {


      const x = timeUntil('2021-09-13T20:20:20');
      console.log(`${x.years}:${x.days % 365}:${x.hours % 24}:${x.minutes % 60}:${x.seconds % 60}`);
      this.days = x.days;
      this.hours = x.hours;
      this.minutes = x.hours;
      this.seconds = x.seconds;


  }
}
