import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  title = 'Règles du jeu concours - ThéTipTop';
  description = 'Prenez connaissance des règles ju jeu concours.'
  constructor(
    private titleService: Title,
    private metaTagService: Meta,
  ) { }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ property: 'og:title', content: this.title });
    this.metaTagService.updateTag({ property: 'og:description', content: this.description });
    this.metaTagService.updateTag({ property: 'og:image:alt', content: this.title });
    this.metaTagService.updateTag({ name: 'description', content: this.description });

  }

}
