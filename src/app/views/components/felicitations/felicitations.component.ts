import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-felicitations',
  templateUrl: './felicitations.component.html',
  styleUrls: ['./felicitations.component.scss']
})
export class FelicitationsComponent implements OnInit {

  @Input() message;
  @Input() lotId;
  @Input() lotName;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
