import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss']
})
export class CguComponent implements OnInit {
  title = 'Conditions générales - ThéTipTop';

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
  ) { }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Description' }
    );
  }

}
