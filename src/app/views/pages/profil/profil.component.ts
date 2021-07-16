import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Gain} from './../../../models/gains/gain'
import { GainService } from 'src/app/services/gain.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [ GainService]
})
export class ProfilComponent implements OnInit {
  gains: Observable<Gain[]>;

  constructor(public service: GainService) {
    this.gains = service.gains$
   }

  ngOnInit(): void {
  }

}
