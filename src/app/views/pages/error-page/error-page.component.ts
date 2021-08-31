import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit, OnDestroy {

  type: any;
  title: any;
  desc: any;
  private sub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    console.log('hii');
    console.log(this.type);

    this.sub = this.route.data.subscribe( param => {
      if (param.type) {
        this.type = param.type;
      }
      if (param.title) {
        this.title = param.title;
      }
      if (param.desc) {
        this.desc = param.desc;
      }
    });

    switch (this.type) {
      case '404':
        if (!this.title) {
          this.title = 'Page Non Trouvée';
        }
        if (!this.desc) {
          this.desc = 'Ouupps!! La page que vous cherchez n\'existe pas';
        }
        break;
      case '500':
        if (!this.title) {
          this.title = 'Internal server error';
        }
        if (!this.desc) {
          this.desc = 'Oopps!! Une erreur est survenue. Veuillez réésayer plus tard';
        }
        break;
      default:
        // if (!this.type) {
        this.type = 'Oopps..';
        // }
        if (!this.title) {
          this.title = 'Il y a eu un problème';
        }
        if (!this.desc) {
          this.desc = 'On dirait qu\'il y a un problème.<br>' + 'On s\'en charge';
        }
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
