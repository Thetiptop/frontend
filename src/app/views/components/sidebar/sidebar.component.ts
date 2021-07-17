import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  title = 'TTT';
  isActivated = false;

  constructor() { }

  ngOnInit(): void {
  }


  checkActivated() {
    // reverse the value of property
    this.isActivated = !this.isActivated;
  }

  checkDisActivated() {
    // set the value of property to false
    this.isActivated = false;
  }


}
