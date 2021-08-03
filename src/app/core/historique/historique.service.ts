import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


export class Ticket {
  numberTicket: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  protected  baseUrl: string = environment.apiURL;

  constructor(
    private http: HttpClient,
  ) { }

  historique(): Observable<any> {
    return this.http.get(this.baseUrl + '/user/all_historical');
  }
}
