import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import IUser from '../../interfaces/IUser';
import { EVENTSURL, SERVER } from '../../constants/constants';
import { Responsersult } from '../../interfaces/response';

/*
  Generated class for the AttendsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AttendsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AttendsProvider Provider');
  }

  getAttendants(id: number): Observable<IUser[]> {
    return this.http.get(EVENTSURL + '/attendants/' + id)
    .catch((resp: HttpErrorResponse) => Observable.throw('Error getting events!' +
         `. Server returned code ${resp.status}, message was: ${resp.message}`))
    .map((resp: Responsersult) => {
      console.log(resp);
  
      if (!resp.error) {
  
        resp.result.attendants.forEach((attendant: IUser) => {
          if (!attendant.avatar.includes('://')) {
            attendant.avatar = SERVER + '/' + attendant.avatar;
          }
        });
  
        return resp.result.attendants;
      } else {
        console.log("ERROR AT GETTING ATTENDANTS OR EVENTS EMPTY");
        return [];
      }
    });
  }

}
