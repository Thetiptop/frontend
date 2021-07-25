import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  activeUrl: any;
  links = [
    { title: 'Historique', fragment: 'historique' },
    { title: 'Mes informations', fragment: 'informations' },
    { title: 'Réclamer', fragment: 'reclamer' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
