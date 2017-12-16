import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {BehaviorSubject, Subject, Subscriber} from 'rxjs';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfirmEmailService {
  _success: Subject<boolean> = new Subject<boolean>();
  success: any;
  constructor(private http: Http, private router: Router) {
  }

  checkToken = (token, uid, provider) => {
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.apiURL}/confirm_user`, JSON.stringify({ confirm_token: token, uid: uid, provider: provider }), options).map((response: Response) => {
      let body = response.json();
      if (body) {
        if (body["status"] == "ok") {
          this._success.next(true);
        }
        if (body["error"] == "No email ") {
          this._success.next(false);
        }
      }
    });
  }

}
