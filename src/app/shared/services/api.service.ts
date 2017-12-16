import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiService {
  constructor( private http: Http ) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return new Headers(headersConfig);
  }

  checkLogin(){
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    if(currentUser) { 
      return true
    }
    else {
      return false;
    }
  }
 
  setNotification(status,content){
    if(status=="red") {
      var noti = document.getElementById("noti-danger");
      var text = document.getElementById("noti-text-danger");
      noti.style.display = "block";
      text.textContent= content;
      setTimeout(function(){ noti.style.display = "none"; }, 3000);
    }
    if(status=="green") {
      var noti = document.getElementById("noti-success");
      var text = document.getElementById("noti-text-success");
      noti.style.display = "block";
      text.textContent= content;
      setTimeout(function(){ noti.style.display = "none"; }, 3000);
    }
    if(status=="yellow") {
      var noti = document.getElementById("noti-warning");
      var text = document.getElementById("noti-text-warning");
      noti.style.display = "block";
      text.textContent= content;
      setTimeout(function(){ noti.style.display = "none"; }, 3000);
    }
  }

  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.apiURL}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiURL}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}, options): Observable<any> {
    return this.http.post(
      `${environment.apiURL}${path}`,
      JSON.stringify(body),
      { headers: options }
    )
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiURL}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }
}