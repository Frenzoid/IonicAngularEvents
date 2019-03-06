import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

import { EventEmitter, Injectable } from '@angular/core';
import { AUTHURL } from '../../constants/constants';
import { Responsersult, ResponseEvents } from '../../interfaces/response';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }


  logged = false;
  $loginEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  register(data) {

    return this.http.post(AUTHURL + 'register/', data)
    .catch((response: HttpErrorResponse) => {console.log(response); return Observable.throw('Error getting confirmation from servers!' +
         `. Server returned code ${response.error}, message was: ${response.message}, server status ${response.status}`); })
    .map((response: Responsersult) => {
      console.log("-OBJETO DE RESPUESTA-");
      console.log(response);
      console.log("---------------------");
      
      if (response.error) { throw response; }

      this.storage.set("token", response.result.token);
      this.logged = true;
      this.$loginEmitter.emit(true);
      console.log("-->LOGGED: " + this.logged);
      return true;
    });
  }



  login(user, section = 'login/'): Observable<boolean> {
    return this.http.post(AUTHURL + section, user)
    .catch((response: HttpErrorResponse) => {console.log(response); return Observable.throw('Error getting confirmation from servers!' +
         `. Server returned code ${response.error}, message was: ${response.message}, server status ${response.status}`); })
    .map((response: Responsersult) => {
      console.log("-OBJETO DE RESPUESTA-");
      console.log(response);
      console.log("---------------------");
      if (response.error) { throw response; }

      this.storage.set("token", response.result.token);
      this.logged = true;
      this.$loginEmitter.emit(true);
      console.log("-->LOGGED: " + this.logged);
      return true;
    });
  }

  logout() {
    this.storage.remove("token");
    console.log('token removed');
    this.$loginEmitter.emit(false);
    this.logged = false;
  }

  isLogged(): Observable<boolean> {
    return Observable.create( (observer: any) => {
      this.storage.get('token').then(() => {
        this.http
          .get(AUTHURL + 'token/')
          .catch((resp: HttpErrorResponse) => Observable.throw('Error with token service ' + resp))
          .map((resp: Responsersult) => {
            if (!resp.error) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          });
      }).catch(() => {
        observer.next(false);
      });
    });
  }

}
