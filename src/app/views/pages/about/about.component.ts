import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  links = [
    { title: 'One', fragment: 'one' },
    { title: 'Two', fragment: 'two' }
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
