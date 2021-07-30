import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-reclamer',
  templateUrl: './reclamer.component.html',
  styleUrls: ['./reclamer.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out',
              style({ height: 50, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 50, opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ReclamerComponent implements OnInit {

  @Input() name;
  isShowDivIf = false;

  toggleDisplay() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}
