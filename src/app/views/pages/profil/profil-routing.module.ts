import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilComponent} from "./profil.component";
import {MotDePasseComponent} from "./mot-de-passe/mot-de-passe.component";
import {ModifierInformationsComponent} from "./modifier-informations/modifier-informations.component";
import {MesInformationsComponent} from "./mes-informations/mes-informations.component";
import {HistoriqueComponent} from "./historique/historique.component";
import {AuthGuard} from "../../../core/authentification/auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ProfilComponent,
    children: [
      { path: '',
        redirectTo: 'historique',
        pathMatch: 'full'
      },
      { path: 'historique', component: HistoriqueComponent },
      { path: 'mes-informations', component: MesInformationsComponent },
      { path: 'modifier-informations', component: ModifierInformationsComponent },
      { path: 'mot-de-passe', component: MotDePasseComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
