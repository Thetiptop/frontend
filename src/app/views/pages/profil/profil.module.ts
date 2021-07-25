import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HistoriqueComponent } from './historique/historique.component';
import { MesInformationsComponent } from './mes-informations/mes-informations.component';
import { ProfilComponent } from './profil.component';
import { PlayComponent } from '../play/play.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilComponent,
    children: [
      {
        path : '',
        redirectTo: 'historique',
        pathMatch: 'full',
      },
      {
        path: 'historique',
        component: HistoriqueComponent
      },
      {
        path: 'informations',
        component: MesInformationsComponent
      }
    ]
  },
  {
    path: 'play',
    component: PlayComponent
  }
];

@NgModule({
  declarations: [PlayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AboutModule { }
