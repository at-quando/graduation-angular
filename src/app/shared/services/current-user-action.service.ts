import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {BehaviorSubject, Subject, Subscriber} from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class CurrentUserActionService {
  _personalInfo: Subject<any> = new Subject<any>();
  _persionalHistory: Subject<any> = new Subject<any>();
  constructor(private http: Http, private router: Router, private api: ApiService) {
  }

  getUserInfo = (id) => {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    let headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Token': currentUser.access_token,
      'Uid': currentUser.uid,
      'Provider': currentUser.provider
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.apiURL}/users/${id}`, options).map((response: Response) => {
      let _user = response.json().user;
      if (_user) {
        this._personalInfo.next(_user);
      }
    })
    .catch((err: Response) => {
      this.api.setNotification("red","Unauthorize!, You do not have permission to perform this operation!")
      return Observable.throw(err);
    });
  }


  editUserInfo = (user, id) => {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    let headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Token': currentUser.access_token,
      'Uid': currentUser.uid,
      'Provider': currentUser.provider
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(`${environment.apiURL}/users/${id}`,JSON.stringify(user), options).map((response: Response) => {
      this.api.setNotification("green","Your Information are updated!");
      var currentUser=JSON.parse(localStorage.getItem('current_user'));
      currentUser.user_name = user.name;
      localStorage.setItem('current_user',JSON.stringify(currentUser));
    })
    .catch((err: Response) => {
      this.api.setNotification("red","Something went wrong now! Please try again later!")
      return Observable.throw(err);
    });
  }

  historyUser = () => {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    let headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Token': currentUser.access_token,
      'Uid': currentUser.uid,
      'Provider': currentUser.provider
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.apiURL}/history`, options).map((response: Response) => {
      let _history = response.json().orders;
      if (_history) {
        this._persionalHistory.next(_history);
      }
    });
  }
}
