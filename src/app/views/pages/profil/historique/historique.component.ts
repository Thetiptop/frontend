import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../../core/authentification/auth.service';
import {HistoriqueService} from '../../../../core/historique/historique.service';
import {ReclamerComponent} from '../../../components/reclamer/reclamer.component';
import {Subject} from 'rxjs';
import {NotificationComponent} from '../../../components/notification/notification.component';
import {Meta, Title} from '@angular/platform-browser';
import {HowToPlayComponent} from "../../../components/how-to-play/how-to-play.component";
import {NewsletterComponent} from "../../../components/newsletter/newsletter.component";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})

export class HistoriqueComponent implements OnInit {
  title = 'Hisorique des gains - ThéTipTop';
  description = 'Retouvez ici la liste des tickets que vous avez gagné';

  modalRef: any;
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  UserProfile: any;
  UserAddress: any;
  historique: any;
  error: any;
  posts: any;

  popUpMessage: any;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private httpClient: HttpClient,
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
    if (this.UserProfile.address && this.UserProfile.telephone) {
      this.modalRef = this.modalService.open(ReclamerComponent, {centered: true, size: 'lg'});
      this.modalRef.componentInstance.lotName = item.name_lot;
      this.modalRef.componentInstance.lotId = item.id;
      this.modalRef.componentInstance.userName = this.UserProfile.name;
      this.modalRef.componentInstance.userId = this.UserProfile.id;
      this.modalRef.componentInstance.phone = this.UserProfile.telephone;
      this.modalRef.componentInstance.address = this.UserProfile.address;
      this.modalRef.componentInstance.additionalAddress = this.UserProfile.additional_address;
      this.modalRef.componentInstance.postalCode = this.UserProfile.postal_code;
      this.modalRef.componentInstance.ville = this.UserProfile.ville;
    }
    else {
      const modalRef = this.modalService.open(NotificationComponent, {centered: true, size: 'lg'});
      this.popUpMessage =
        "<p>Veuillez renseignez votre adresse complète et votre numero de téléphone avant de pouvoir réclamer votre gain.</p>" +
        "<p><u><a href='/profil/modifier-informations'>Modifier mes informations</a></u></p>";
      modalRef.componentInstance.message = this.popUpMessage;
    }
  }

  openNotification(): void {
    const modalRef = this.modalService.open(NotificationComponent, {centered: true});
    modalRef.componentInstance.message = this.popUpMessage;
  }

  openNewsletter(): void {
    this.modalRef = this.modalService.open(NewsletterComponent, {centered: true});
  }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({property: 'og:title', content: this.title});
    this.metaTagService.updateTag({property: 'og:description', content: this.description});
    this.metaTagService.updateTag({name: 'description', content: this.description});


    // Table Config
    this.dtOptions = {
      language: {
        search: 'Rechercher : ',
        processing: 'Chargement...',
        lengthMenu: 'Afficher _MENU_ éléments',
        info: 'Affichage de _START_ à _END_ de _TOTAL_ éléments',
        infoEmpty: 'Affichage de 0 à 0 sur 0 entrées',
        emptyTable: 'Aucun lot gagné.',
        paginate: {
          first: 'Premier',
          previous: 'Précédent',
          next: 'Prochain',
          last: 'Dernier'
        },
      },
      lengthMenu: [3, 10, 20, 30],
      pageLength: 3,
    };

    // this.authService.profileUser().subscribe(
    //   data => {
    //     console.log(data);
    //     this.UserProfile = data.detail;
    //     this.UserAddress = this.UserProfile.address;
    //   },
    //   err => {
    //     this.error = err;
    //     this.popUpMessage = 'Veuillez vous reconnecter.';
    //     this.openNotification();
    //     this.authService.onLogout();
    //   });

    // this.historiqueService.historique().subscribe(
    //   data => {
    //     this.historique = data.historical;
    //     this.dtTrigger.next();
    //   }
    // );
  }


  // If User address = null ? Afficher text
  // "Veuillez ajouter votre adresse pouvoir réclamer. Nous avons besoin de votre adresse pour vous le faire parvenir
  // and afficher just below that "Ajouter votre adresse" button that redirectionner sur "Modifier Profil Component
  // add variale haveAddress: boolean
}
