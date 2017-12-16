import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject, Subject, Subscriber} from 'rxjs';
import { Product } from '../models/Product';
import { environment } from '../../../environments/environment';

@Injectable()
export class ShopsService {
  _shopsSubject: Subject<any> = new Subject<any>();
  _shopSubject: Subject<any> = new Subject<any>();

  constructor(private http: Http) {}

  getShopsList = () => {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.apiURL}/shops`, options)
      .map((response: Response) => {
        let _body = response.json();
        this._shopsSubject.next(_body.shops);
      });
  }

  getShop = (id) => {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.apiURL}/shops/${id}`, options)
      .map((response: Response) => {
        let _body = response.json();
        this._shopSubject.next(_body.shop);
      });
  }
}
