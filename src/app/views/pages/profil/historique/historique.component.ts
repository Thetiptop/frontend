import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../../core/authentification/auth.service';
import {HistoriqueService} from '../../../../core/historique/historique.service';
import {ReclamerComponent} from '../../../components/reclamer/reclamer.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})

export class HistoriqueComponent implements OnInit {
  modalRef: any;
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  editProfileForm: FormGroup;

  jsonData: any = [
    {
      playerName: 'Nom du lot 1',
      playerCountry: 'Pourtgal',
      playerBirthday: 1988,
      playerClub: 'Juventus',
      id: 151
    },
    {
      playerName: 'Nom du lot 2',
      playerCountry: 'Argentina',
      playerBirthday: 1989,
      playerClub: 'Barcelona',
      id: 152
    },
    {
      playerName: 'Nom du lot 3',
      playerCountry: 'Brazil',
      playerBirthday: 1990,
      playerClub: 'PSG',
      id: 153
    },
    {
      playerName: 'Nom du lot 4',
      playerCountry: 'Germany',
      playerBirthday: 1991,
      playerClub: 'Real Madrid',
      id: 154
    },
    {
      playerName: 'Nom du lot 5',
      playerCountry: 'France',
      playerBirthday: 1992,
      playerClub: 'Manchester United',
      id: 155
    },
    {
      playerName: 'Nom du lot 6',
      playerCountry: 'Spain',
      playerBirthday: 1993,
      playerClub: 'Real Madrid',
      id: 155
    },
    {
      playerName: 'Nom du lot 7',
      playerCountry: 'England',
      playerBirthday: 1994,
      playerClub: 'Tottanhum',
      id: 156
    },
    {
      playerName: 'Nom du lot 8',
      playerCountry: 'Urgway',
      playerBirthday: 1995,
      playerClub: 'Atletico Madrid',
      id: 157
    },
    {
      playerName: 'Nom du lot 9',
      playerCountry: 'Belgium',
      playerBirthday: 1996,
      playerClub: 'Real Madrid',
      id: 158
    },
    {
      playerName: 'Nom du lot 10',
      playerCountry: 'Brazil',
      playerBirthday: 1997,
      playerClub: 'Real Madrid',
      id: 159
    },
    {
      playerName: 'Nom du lot 11',
      playerCountry: 'France',
      playerBirthday: 1997,
      playerClub: 'Real Madrid',
      id: 160
    },
    {
      playerName: 'Nom du lot 12',
      playerCountry: 'France',
      playerBirthday: 1998,
      playerClub: 'Barcelona',
      id: 161
    },
    {
      playerName: 'Nom du lot 13',
      playerCountry: 'Senegal',
      playerBirthday: 1999,
      playerClub: 'Liverpool',
      id: 162
    }];

  lotJsonData: any = [
    {
      idTicket: 311,
      idUser: 2,
      takenAt: null,
      created_at: '2021-08-02T10:54:38.000000Z',
      updated_at: '2021-08-02T10:54:38.000000Z',
      id: 1,
    },
    {
      idTicket: 328,
      idUser: 2,
      takenAt: null,
      created_at: '2021-08-02T11:12:34.000000Z',
      updated_at: '2021-08-02T11:12:34.000000Z',
      id: 2,
    },
    {
      idTicket: 329,
      idUser: 2,
      takenAt: null,
      created_at: '2021-08-02T11:19:37.000000Z',
      updated_at: '2021-08-02T11:19:37.000000Z',
      id: 3,
    },
    {
      idTicket: 333,
      idUser: 2,
      takenAt: null,
      created_at: '2021-08-02T11:25:44.000000Z',
      updated_at: '2021-08-02T11:25:44.000000Z',
      id: 4,
    },
    {
      idTicket: 334,
      idUser: 2,
      takenAt: null,
      created_at: '2021-08-02T11:29:10.000000Z',
      updated_at: '2021-08-02T11:29:10.000000Z',
      id: 5,
    },
    {
      idTicket: 335,
      idUser: 2,
      takenAt: null,
      created_at: '2021-08-02T11:40:48.000000Z',
      updated_at: '2021-08-02T11:40:48.000000Z',
      id: 6,
    },
    {
      idTicket: 336,
      idUser: 2,
      takenAt: null,
      created_at: '2021-08-02T11:41:54.000000Z',
      updated_at: '2021-08-02T11:41:54.000000Z',
      id: 7,
    },
    {
      idTicket: 338,
      idUser: 2,
      takenAt: null,
      created_at: '2021-08-02T11:44:02.000000Z',
      updated_at: '2021-08-02T11:44:02.000000Z',
      id: 8,
    },
    {
      idTicket: 339,
      idUser: 2,
      takenAt: null,
      created_at: '2021-08-02T11:46:36.000000Z',
      updated_at: '2021-08-02T11:46:36.000000Z',
      id: 9,
    }
  ];

  UserProfile: any;
  UserAddress: any;
  historique: any;
  error: any;
  posts: any;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private http: HttpClient,
              private historiqueService: HistoriqueService,
              private fb: FormBuilder,
              config: NgbModalConfig,
              private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // Open PopUp
  open(item) {
    this.modalRef = this.modalService.open(ReclamerComponent, {centered: true, size: 'lg'});
    this.modalRef.componentInstance.lotName = item.idTicket;
    this.modalRef.componentInstance.lotId = item.id;
    this.modalRef.componentInstance.userName = this.UserProfile.name;
    this.modalRef.componentInstance.userId = this.UserProfile.id;
    this.modalRef.componentInstance.phone = this.UserProfile.telephone;
    this.modalRef.componentInstance.address = this.UserProfile.address;
    this.modalRef.componentInstance.additionalAddress = this.UserProfile.additional_address;
    this.modalRef.componentInstance.postalCode = this.UserProfile.postal_code;
    this.modalRef.componentInstance.ville = this.UserProfile.ville;
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        search: 'Rechercher : ',
        processing: 'Procesando...',
        lengthMenu: 'Afficher _MENU_ éléments',
        info: 'Affichage de _START_ à _END_ de _TOTAL_ éléments',
        // infoEmpty: 'Mostrando ningún elemento.',
        // emptyTable: "Aucun lot gagngé.",
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

    this.authService.profileUser().subscribe(
      data => {
        this.UserProfile = data.detail;
        this.UserAddress = this.UserProfile.address;
      },
      err => {
        this.error = err.status;
        this.authService.onLogout(event);
      });

    this.http.get('http://jsonplaceholder.typicode.com/posts')
      .subscribe(posts => {
        this.posts = posts;
      });

    this.historiqueService.historique().subscribe(
      data => {
        this.historique = data.historical;
        this.dtTrigger.next();
      }
    );
  }

}
