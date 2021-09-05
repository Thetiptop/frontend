import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../../components/notification/notification.component';
import { AuthService } from 'src/app/core/authentification/auth.service';

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
    @Input() id_user;

        constructor(

            public activeModal: NgbActiveModal,
            private http: HttpClient,
            private modalService: NgbModal,
            private authService: AuthService
        ) { }

    ngOnInit(): void {
    }

    open(): any {
        const modalRef = this.modalService.open(NotificationComponent, { centered: true });
        modalRef.componentInstance.message = this.popUpMessage;
    }

    deleteAccount(): void {
        
        this.http.get(this.baseUrl + '/user/delete-account/' + this.id_user).subscribe(
            result => {
                this.success = result;
                this.popUpMessage = 'Compte supprimé';
                this.modalService.dismissAll();
                this.open();
                this.authService.onLogout();
            },

            error => {
                this.errors = error.error.message || "Une erreur s'est produite. Veuillez contacter l'administrateur.";
            }
        )
    }


}
