import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TTT';
  isActivated = false;

  constructor() { }

  ngOnInit(): void { }


  checkActivated() {
    // reverse the value of property
    this.isActivated = !this.isActivated;
  }

  checkDisActivated() {
    // set the value of property to false
    this.isActivated = false;
  }

}
