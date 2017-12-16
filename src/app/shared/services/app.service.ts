import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {BehaviorSubject, Subject, Subscriber} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppService {
  category: any;
  constructor(private http: Http) { }

  getAllCategories = () => {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.apiURL}/categories`)
      .map(response => response.json());
  }


}
