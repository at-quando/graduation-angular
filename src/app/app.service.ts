import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {BehaviorSubject, Subject, Subscriber} from 'rxjs';

@Injectable()
export class AppService {
  // private apiURL = "http://172.17.19.240:3001";
  private apiURL = "http://localhost:3001";
  category: any;
  constructor(private http: Http) { }


  getAllCategories = () => {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiURL + "/categories")
      .map(response => response.json());
  }

  getAllShops = () => {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiURL + "/shops")
      .map(response => response.json());
  }

  getDetailShop = (id: number) => {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiURL + `/shops/id`)
      .map(response => response.json());
  }
}
