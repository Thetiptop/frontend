import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';


export class Ticket {
  numberTicket: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  protected  baseUrl: string = environment.apiURL;

  constructor(
    private http: HttpClient,

  ) { }

  play(ticket: Ticket): Observable<any> {
    return this.http.post(this.baseUrl + '/search-lot', ticket);
  }
}
