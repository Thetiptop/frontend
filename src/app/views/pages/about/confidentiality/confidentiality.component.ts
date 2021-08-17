import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-confidentiality',
  templateUrl: './confidentiality.component.html',
  styleUrls: ['./confidentiality.component.scss']
})
export class ConfidentialityComponent implements OnInit {
  title = 'Confidentialité - ThéTipTop';

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
