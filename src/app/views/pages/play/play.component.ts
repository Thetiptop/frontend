import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FelicitationsComponent } from '../../components/felicitations/felicitations.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayService } from '../../../core/play/play.service';
import {AuthService} from '../../../core/authentification/auth.service';
import {AuthStateService} from '../../../core/authentification/auth-state.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  isSignedIn: any;
  UserProfile: any;
  error: any;
  popUpMessage: any;
  playForm: FormGroup;
  isFormSubmitted: boolean;
  errors: any;
  success: any;
  lotName: any;
  lotId: any;
  colors = ['#bb0000', '#ffffff'];
  modalRef: any;

  constructor(config: NgbModalConfig,
              private authService: AuthService,
              private authState: AuthStateService,
              private modalService: NgbModal,
              private playService: PlayService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  get form() {
    return this.playForm.controls;
  }

  ngOnInit(): void {
    this.playForm = new FormGroup({
      numberTicket: new FormControl(null, [Validators.required])
    });
    this.isFormSubmitted = false;
  }

  open() {
    this.modalRef = this.modalService.open(FelicitationsComponent, {centered: true, size: 'xl'} );
    this.modalRef.componentInstance.message = this.popUpMessage;
    this.modalRef.componentInstance.lotName = this.lotName;
    this.modalRef.componentInstance.lotId = this.lotId;
  }

  onSubmit() {
    if (this.playForm.valid) {
      this.playService.play(this.playForm.value).subscribe(
        result => {
          this.success = result;
          // console.log(result);
          this.lotName = this.success.ticket.lot;
          this.lotId = this.success.ticket.id;
          this.popUpMessage = 'Vous avez gagné ! Woohoo !';
          this.playForm.reset();
        },
        res => {
          this.errors = res.error.error;
        }, () => {
          this.open();
        }
      );
    }
    this.isFormSubmitted = true;
  }
}
