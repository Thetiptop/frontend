import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';


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
    return this.http.post(this.baseUrl + '/search-lot', ticket)
      .pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      }));
  }
}
