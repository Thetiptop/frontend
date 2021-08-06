import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  UserProfile: any;
  UserAddress: any;
  historique: any;
  error: any;
  posts: any;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private http: HttpClient,
              private historiqueService: HistoriqueService,
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
        processing: 'Chargement...',
        lengthMenu: 'Afficher _MENU_ éléments',
        info: 'Affichage de _START_ à _END_ de _TOTAL_ éléments',
        // infoEmpty: 'Mostrando ningún elemento.',
        emptyTable: 'Aucun lot gagné.',
        // https://stackoverflow.com/questions/36849610/datatables-change-interface-language,
        paginate: {
          first: 'Premier',
          previous: 'Précédent',
          next: 'Prochain',
          last: 'Dernier'
        },
      },
      lengthMenu: [3, 5, 10, 25],
      pageLength: 3,
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

    this.historiqueService.historique().subscribe(
      data => {
        this.historique = data.historical;
        console.log(this.historique);
        this.dtTrigger.next();
      }
    );
  }

}
