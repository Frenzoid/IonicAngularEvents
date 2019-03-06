// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthTokenInterceptorService {

  constructor(public storage: Storage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = false;
    let sendReq = req;

    return Observable.fromPromise(
      this.storage.get('token')
    )
    .switchMap(token => {
      if (token) {
        sendReq = req.clone({
          headers: req.headers.set('Authorization', token)
        });
        console.log('-Inyectando Token-');
        console.log(token);
      }

      return next.handle(sendReq).do((resp: HttpResponse<any>) => {
        if (resp instanceof HttpResponse && resp.body.result.token) {
          console.log('-capturand token-');
          console.log(resp.body.result.token);
          this.storage.set("token", resp.body.result.token);
        }
      });
    });
  }
}
