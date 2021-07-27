import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HistoriqueComponent } from './historique/historique.component';
import { MesInformationsComponent } from './mes-informations/mes-informations.component';
import { ProfilComponent } from './profil.component';
import { ModifierInformationsComponent } from './modifier-informations/modifier-informations.component';
import { MotDePasseComponent } from './mot-de-passe/mot-de-passe.component';

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
        path: 'mes-informations',
        component: MesInformationsComponent
      },
      {
        path: 'mot-de-passe',
        component: MotDePasseComponent
      },
      {
        path: 'edit-profile',
        component: ModifierInformationsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [ModifierInformationsComponent, MotDePasseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class AboutModule { }
