import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Réclamation</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
      <p>Votre Lot "The Bio à base de citron" sera livré.</p>
      <p>Vous confirmez que votre lot vous sera livré a cette addresse ? :  " 2 bis avenue Arsitide Briand, 92000"</p>
      <p (click)=toggleDisplay()><i><u>Envoyer le lot à une autre addresse</u></i></p>
      <input [style.display]="isShowDivIf ? 'block' : 'none' " class="form-control new-address" placeholder="Saisissez l'addresse de livraison">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Annuler</button>
      <button type="button" class="btn btn-lipton">Confirmer</button>
    </div>
  `
})

export class NgbdModalContent {
  @Input() name;
  isShowDivIf = false;

  toggleDisplay() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})

export class HistoriqueComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  jsonData: any = [
    {
      playerName: 'Cristiano Ronaldo',
      playerCountry: 'Pourtgal',
      playerBirthday: 1988,
      playerClub: 'Juventus',
      id: 151
    },
    {
      playerName: 'Lionel Messi',
      playerCountry: 'Argentina',
      playerBirthday: 1989,
      playerClub: 'Barcelona',
      id: 152
    },
    {
      playerName: 'Neymar Junior',
      playerCountry: 'Brazil',
      playerBirthday: 1990,
      playerClub: 'PSG',
      id: 153
    },
    {
      playerName: 'Tonni Kroos',
      playerCountry: 'Germany',
      playerBirthday: 1991,
      playerClub: 'Real Madrid',
      id: 154
    },
    {
      playerName: 'Paul Pogba',
      playerCountry: 'France',
      playerBirthday: 1992,
      playerClub: 'Manchester United',
      id: 155
    },
    {
      playerName: 'Sergio Ramos',
      playerCountry: 'Spain',
      playerBirthday: 1993,
      playerClub: 'Real Madrid',
      id: 155
    },
    {
      playerName: 'H. Kane',
      playerCountry: 'England',
      playerBirthday: 1994,
      playerClub: 'Tottanhum',
      id: 156
    },
    {
      playerName: 'Luiz Suarez',
      playerCountry: 'Urgway',
      playerBirthday: 1995,
      playerClub: 'Atletico Madrid',
      id: 157
    },
    {
      playerName: 'Eden Hazard',
      playerCountry: 'Belgium',
      playerBirthday: 1996,
      playerClub: 'Real Madrid',
      id: 158
    },
    {
      playerName: 'Vinicious Junior',
      playerCountry: 'Brazil',
      playerBirthday: 1997,
      playerClub: 'Real Madrid',
      id: 159
    },
    {
      playerName: 'Karim Benzema',
      playerCountry: 'France',
      playerBirthday: 1997,
      playerClub: 'Real Madrid',
      id: 160
    },
    {
      playerName: 'Ant. Grizzeman',
      playerCountry: 'France',
      playerBirthday: 1998,
      playerClub: 'Barcelona',
      id: 161
    },
    {
      playerName: 'Sadio Mane',
      playerCountry: 'Senegal',
      playerBirthday: 1999,
      playerClub: 'Liverpool',
      id: 162
    }];

  constructor(private httpClient: HttpClient,
              config: NgbModalConfig,
              private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent, { centered: true });
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        search: 'Rechercher : ',
        processing: 'Procesando...',
        lengthMenu: 'Afficher _MENU_ éléments',
        info: 'Affichage de _START_ à _END_ de _TOTAL_ éléments',
        // infoEmpty: 'Mostrando ningún elemento.',
        // emptyTable: "No hay datos disponibles en la tabla",
        // https://stackoverflow.com/questions/36849610/datatables-change-interface-language,
        paginate: {
          first: 'Premier',
          previous: 'Précédent',
          next: 'Prochain',
          last: 'Dernier'
        },
      },
      lengthMenu : [3, 5, 10, 25],
      pageLength: 3
    };
  }

  ngOnDestroy(): void {
  }

}
