import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  protected baseUrl: string = environment.apiURL;
  popUpMessage: string;
  errors: any;
  UserId: any;
  success: any;
  
  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(): any {
    const modalRef = this.modalService.open(NotificationComponent, { centered: true });
    modalRef.componentInstance.message = this.popUpMessage;
  }

  deleteAccount(): void {
    this.UserId = JSON.parse(localStorage.getItem("client_id")).value;
         
    this.http.delete(this.baseUrl + '/user/delete/' + this.UserId).subscribe(
      result=>{
        this.success = result;
        this.popUpMessage = 'Compte supprimé';
        this.activeModal.close('Close click');
      },
  
      error=>{
        console.log(error)
        this.errors = error.error.message || "Une erreur s'est produite. Veuillez contacter l'administrateur.";
        this.popUpMessage='Erreur';
      },
  
      ()=>{
        this.open();
      }
      )
  }

}
