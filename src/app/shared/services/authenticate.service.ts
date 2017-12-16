import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {BehaviorSubject, Subject, Subscriber} from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private router: Router, private api: ApiService) { }


  login = (email: string, password: string) => {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.apiURL}/session`, JSON.stringify({ uid: email, password: password }), options)
      .map((response: Response) => {
          let _headers = response.headers;
          if (_headers) {
            let access_token = _headers.get('access-token');
            let uid = _headers.get('uid');
            let provider = _headers.get('provider');

            let user_name = `${response.json().user.name}`;
            let user_id = `${response.json().user.id}`;
            let user_avatar = `${response.json().user.avatar}`;
            localStorage.setItem('current_user', JSON.stringify({user_id: user_id, access_token: access_token, user_name: user_name, uid: uid, provider: provider, user_avatar: user_avatar }));
            location.reload();
          }
      })
      .catch((err: Response) => {
          this.api.setNotification("red","Email or password incorrect, please try again!")
          return Observable.throw(err);
        })
  }

  signup = (user, email: string, password: string) => {
    console.log(user);
    let headers = new Headers({ 
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.apiURL}/users`, { user, uid: email, password: password }, options)
      .map((response: Response) => {
        this.api.setNotification('yellow', 'please check your email to confirm account!');
      })
      .catch((err: Response) => {
          return Observable.throw(err);
        })
  }

  pushTokenFacebook = (user) => {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Token': user.accessToken,
      'Uid': user.userID,
      'Provider': 'facebook'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.apiURL}/omni_auth`, JSON.stringify({}), options).map((response: Response) => {
      let _headers = response.headers;
      let _body = response.json();
      if (_headers) {
        let user_id = _body.user.id;
        let user_avatar = _body.user.avatar;
        let user_name = _body.user.name;
        let access_token = _headers.get('access-token');
        let uid = _headers.get('uid');
        let provider = _headers.get('provider');
        localStorage.setItem('current_user', JSON.stringify({ user_id: user_id,access_token: access_token, uid: uid, provider: provider, user_avatar: user_avatar, user_name: user_name }));
        location.reload();
      }
    });
  }

  logout = () => {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    let headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Token': currentUser.access_token,
      'Uid': currentUser.uid,
      'Provider': currentUser.provider
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(`${environment.apiURL}/session/1`, options)
    .map((response: Response) => {
      localStorage.removeItem('current_user');
      window.location.reload();
    })
    .catch((err: Response) => {
      localStorage.removeItem('current_user');
      window.location.reload();
      return Observable.throw(err);
    });
  }
}
