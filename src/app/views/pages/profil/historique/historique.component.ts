import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ReclamerComponent} from '../../../components/reclamer/reclamer.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../core/authentification/auth.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})

export class HistoriqueComponent implements OnInit, OnDestroy {
  modalRef: any;

  dtOptions: DataTables.Settings = {};
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
  UserProfile: any;
  UserAddress: any;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private fb: FormBuilder,
              config: NgbModalConfig,
              private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(item) {
    setTimeout(() => {
    this.modalRef = this.modalService.open(ReclamerComponent, {centered: true, size: 'lg'} );
    this.modalRef.componentInstance.lotName = item.playerName;
    this.modalRef.componentInstance.lotId = item.id;
    this.modalRef.componentInstance.userName = this.UserProfile.name;
    this.modalRef.componentInstance.userId = this.UserProfile.id;
    this.modalRef.componentInstance.phone = this.UserProfile.telephone;
    this.modalRef.componentInstance.address = this.UserProfile.address;
    this.modalRef.componentInstance.additionalAddress = this.UserProfile.additional_address;
    this.modalRef.componentInstance.postalCode = this.UserProfile.postal_code;
    this.modalRef.componentInstance.ville = this.UserProfile.ville;
  }, 0);
  }

  ngOnInit(): void {
    this.authService.profileUser().subscribe(
      data => {
        this.UserProfile = data.detail;
        this.UserAddress = this.UserProfile.address;
      });

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
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    this.modalService.dismissAll();
    // console.log('res:', this.editProfileForm.getRawValue());
  }


}
