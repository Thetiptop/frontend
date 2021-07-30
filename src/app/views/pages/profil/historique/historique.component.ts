import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ReclamerComponent} from '../../play/reclamer/reclamer.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})

export class HistoriqueComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  editProfileForm: FormGroup;
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
  title = 'modal2';
  userList = [
    {
      id: '1',
      firstname: 'Aiman',
      lastname: 'Rahmat',
      username: 'aimanrahmat',
      email: 'aimanrahmat@gmail.com'
    },
    {
      id: '2',
      firstname: 'Christiano',
      lastname: 'Ronaldo',
      username: 'ronaldo7',
      email: 'ronaldo7@gmail.com'
    },
    {
      id: '3',
      firstname: 'Wayne',
      lastname: 'Rooney',
      username: 'rooney8',
      email: 'rooney8@gmail.com'
    }];

  constructor(private httpClient: HttpClient,
              private fb: FormBuilder,
              config: NgbModalConfig,
              private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(item) {
    const modalRef = this.modalService.open(ReclamerComponent, {centered: true} );
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.id = item.id;
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
      lengthMenu: [3, 5, 10, 25],
      pageLength: 3
    };
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    this.modalService.dismissAll();
    console.log('res:', this.editProfileForm.getRawValue());
  }


}
