import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { USERURL, SERVER } from '../../constants/constants';
import IUser from '../../interfaces/IUser';
import { Responsersult } from '../../interfaces/response';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
  }

  getUser(id = "me"): Observable<IUser> {
    return this.http.get(USERURL + '' + id)
    .catch((resp: HttpErrorResponse) => Observable.throw('Error getting events!' +
         `. Server returned code ${resp.status}, message was: ${resp.message}`))
    .map((resp: Responsersult) => {
      console.log(resp);
  
      if (!resp.error) {
  
        if (!resp.result.users.avatar.includes('://')) {
          resp.result.users.avatar = SERVER + '/' + resp.result.users.avatar;
        }
        resp.result.users.lat = +resp.result.users.lat;
        resp.result.users.lng = +resp.result.users.lng;
        
        return resp.result.users;
      } else {
        console.log("ERROR AT GETTING USER PROFILE, NOT FOUND OR ERROED");
        
        return ;
      }
    });
  }
  
  updateUserData(user: IUser): Observable<boolean> {
    return this.http.put(USERURL + "/me", user)
      .catch((resp: HttpErrorResponse) => Observable.throw('Error submitting event!' +
        `. Server returned code ${resp.status}, message was: ${resp.message}`))
      .map((resp: Responsersult) => {
        console.log(resp);
        if (resp.error) { console.error(resp.errorMessage); throw resp.errorMessage; }
        return !resp.error;
      });
  }
  
  updateUserCreds(password: string, password2: string): Observable<boolean> {
    const credentials = {password: password, password2: password2};
    return this.http.put(USERURL + "/me/password", credentials)
      .catch((resp: HttpErrorResponse) => Observable.throw('Error submitting event!' +
        `. Server returned code ${resp.status}, message was: ${resp.message}`))
      .map((resp: Responsersult) => {
        console.log(resp);
        if (resp.error) { console.error(resp.errorMessage); throw resp.errorMessage; }
        return !resp.error;
      });
  }
  
  updateUserAvatar(avatar: string): Observable<boolean> {
    const ava = {avatar: avatar};
    return this.http.put(USERURL + "/me/avatar", ava)
      .catch((resp: HttpErrorResponse) => Observable.throw('Error submitting event!' +
        `. Server returned code ${resp.status}, message was: ${resp.message}`))
      .map((resp: Responsersult) => {
        console.log(resp);
        if (resp.error) { console.error(resp.errorMessage); throw resp.errorMessage; }
        return !resp.error;
      });
  }
  

}
