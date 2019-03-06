import { EVENTSURL, SERVER } from '../../constants/constants';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import IEvent from '../../interfaces/IEvent';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ResponseEvents, Responsersult } from '../../interfaces/response';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EventsProvider Provider');
  }

  getEvents(who: string = ""): Observable<IEvent[]> {
    return this.http.get(EVENTSURL + who)
      .catch((resp: HttpErrorResponse) => Observable.throw('Error getting events!' +
        `. Server returned code ${resp.status}, message was: ${resp.message}`))
      .map((resp: Responsersult) => {
        console.log(EVENTSURL + who);
        console.log(resp);
        if (!resp.error) {

          resp.result.events.forEach((event: IEvent) => {
            event.image = SERVER + '/' + event.image;
            event.creator.avatar = SERVER + '/' + event.creator.avatar;
            event.lat = +event.lat;
            event.lng = +event.lng;
          });

          return resp.result.events;
        } else {
          console.log("ERROR AT GETTING EVENTS OR EVENTS EMPTY");
          return [];
        }
      });
  }

  getEvent(id: number): Observable<any | IEvent> {
    return this.http.get(EVENTSURL + id)
      .catch((resp: HttpErrorResponse) => Observable.throw('Error getting event!' +
        `. Server returned code ${resp.status}, message was: ${resp.message}`))
      .map((resp: Responsersult) => {
        console.log(resp);
        if (!resp.error) {
          resp.result.events[0].image = SERVER + '/' + resp.result.events[0].image;
          resp.result.events[0].creator.avatar = SERVER + '/' + resp.result.events[0].creator.avatar;
          return resp.result.events[0];
        } else {
          console.log("ERROR AT GETTING ONE EVENT");
          
          return [];
        }
      });
  }

  addEvent(event: IEvent): Observable<boolean> {
    return this.http.post(EVENTSURL, event)
      .catch((resp: HttpErrorResponse) => Observable.throw('Error submitting event!' +
        `. Server returned code ${resp.status}, message was: ${resp.message}`))
      .map((resp: Responsersult) => {
        console.log(resp);
        if (resp.error) { console.error(resp.errorMessage); throw resp.errorMessage; }
        return !resp.error;
      });
  }

  updateEvent(event: IEvent): Observable<boolean> {
    return this.http.put(EVENTSURL + "/" + event.id, event)
      .catch((resp: HttpErrorResponse) => Observable.throw('Error submitting event!' +
        `. Server returned code ${resp.status}, message was: ${resp.message}`))
      .map((resp: Responsersult) => {
        console.log(resp);
        if (resp.error) { console.error(resp.errorMessage); throw resp.errorMessage; }
        return !resp.error;
      });
  }

  removeEvent(id: number): Observable<boolean> {
    return this.http.delete(EVENTSURL + id)
      .catch((resp: HttpErrorResponse) => Observable.throw('Error deleting le event!' +
        `. Server returned code ${resp.status}, message was: ${resp.message}`))
      .map((resp: Responsersult) => {
        console.log(resp);
        console.log(resp);
        if (resp.error) { console.error(resp.errorMessage); throw resp.errorMessage; }
        return !resp.error;
      });
  }

  attendEvent(Q: number, id: number): Observable<boolean> {
    const cuantObject = { quantity: Q };
    return this.http.post(EVENTSURL + "attend/" + id, cuantObject)
      .catch((resp: HttpErrorResponse) => Observable.throw('Error attending le event!' +
        `. Server returned code ${resp.status}, message was: ${resp.message}`))
      .map((resp: Responsersult) => {
        console.log(resp);
        if (resp.error) { console.error(resp.errorMessage); throw resp.errorMessage; }
        return !resp.error;
      });
  }

}
