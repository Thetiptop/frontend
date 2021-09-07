import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {Meta, Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FelicitationsComponent} from '../../components/felicitations/felicitations.component';
import {PlayService} from '../../../core/play/play.service';
import {AuthService} from '../../../core/authentification/auth.service';
import {AuthStateService} from '../../../core/authentification/auth-state.service';
import {HowToPlayComponent} from '../../components/how-to-play/how-to-play.component';
import {CanonicalService} from "../../../core/shared/canonical.service";


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  title = 'Jouer - ThéTipTop';
  description= 'Tentez vos changes de gagner un infuseur à thé, un thé detox, un thé signature ou un coffret découverte !';

  isSignedIn: any;
  error: any;
  popUpMessage: any;
  playForm: FormGroup;
  isFormSubmitted: boolean;
  errors: any;
  success: any;
  lotName: any;
  lotId: any;
  modalRef: any;
  userName: any;
  UserProfile: any;

  constructor(config: NgbModalConfig,
              private titleService: Title,
              private router: Router,
              private metaTagService: Meta,
              private authService: AuthService,
              private authState: AuthStateService,
              private modalService: NgbModal,
              private playService: PlayService,
              private canonicalService: CanonicalService,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  get form(): any {
    return this.playForm.controls;
  }

  ngOnInit(): void {
    // SEO
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({property: 'og:title', content: this.title});
    this.metaTagService.updateTag({property: 'og:description', content: this.description});
    this.metaTagService.updateTag({property: 'og:image', content: '/assets/images/mango-bg.jpg'});
    this.metaTagService.updateTag({property: 'og:image:alt', content: this.title});
    this.metaTagService.updateTag({name: 'description', content: this.description});

    this.canonicalService.setCanonicalURL();


    this.authState.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });

    if (this.isSignedIn) {
      this.authService.profileUser().subscribe(
        data => {
          this.UserProfile = data.detail;
          this.userName = this.UserProfile.name;
        },
        err => {
          this.error = err.status;
          this.authService.onLogout();
        });
    }

    this.playForm = new FormGroup({
      numberTicket: new FormControl(null, [Validators.required])
    });
    this.isFormSubmitted = false;
  }

  open(): void {
    this.modalRef = this.modalService.open(FelicitationsComponent, {centered: true, size: 'xl'});
    this.modalRef.componentInstance.message = this.popUpMessage;
    this.modalRef.componentInstance.lotName = this.lotName;
    this.modalRef.componentInstance.lotId = this.lotId;
    this.modalRef.componentInstance.userName = this.userName;
  }

  open2(): void {
    this.modalRef = this.modalService.open(HowToPlayComponent, {centered: true});
  }

  onSubmit(): void {
    if (this.playForm.valid) {
      this.playService.play(this.playForm.value).subscribe(
        result => {
          this.success = result;
          this.lotName = this.success.ticket.lot;
          this.lotId = this.success.ticket.id;
          this.playForm.reset();
          this.open();
        },
        res => {
          this.errors = res.error.message;
        }
      );
    }
    this.isFormSubmitted = true;
  }
}
