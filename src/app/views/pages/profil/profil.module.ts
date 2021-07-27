import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HistoriqueComponent } from './historique/historique.component';
import { MesInformationsComponent } from './mes-informations/mes-informations.component';
import { ProfilComponent } from './profil.component';

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
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class AboutModule { }
