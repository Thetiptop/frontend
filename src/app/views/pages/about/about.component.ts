import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  links = [
    { title: 'Confidentialité', fragment: 'confidentiality' },
    { title: 'Conditions générales', fragment: 'cgu' },
    { title: 'Mentions légales', fragment: 'mentions-legales' },
    { title: 'Cookies', fragment: 'cookies' }
  ];
  public activeUrl: any;
  constructor(public route: ActivatedRoute) {
    route.url.subscribe(() => {
      // @ts-ignore
      this.activeUrl = route.snapshot.firstChild.url[0].path;
      });
  }

  ngOnInit(): void {
  }

}
