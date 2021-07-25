import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  activeUrl: any;
  links = [
    { title: 'Historique', fragment: 'cgu' },
    { title: 'Mes informations', fragment: 'mentions-legales' },
    { title: 'Réclamer', fragment: 'confidentiality' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
