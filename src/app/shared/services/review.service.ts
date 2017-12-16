import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BehaviorSubject, Subject, Subscriber } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from '../../../environments/environment';
import { ApiService } from '../services/api.service'

@Injectable()
export class ReviewService {
  _reviewSubject: Subject<Product[]> = new Subject<Product[]>();
  reviews: any;

  constructor(private http: Http, private api :ApiService) {
    this._reviewSubject.subscribe(data=> {
      this.reviews = data;
    }) 
  }

  getReviewProduct = (id) => {
    let params = new URLSearchParams();
    params.set('id', id);
    let options = new RequestOptions();
    options.search=params;
    return this.http.get(`${environment.apiURL}/comments`, options)
    .map((response: Response) => {
      let _header = response.headers;
      let _body = response.json();
      this._reviewSubject.next(_body);
    });
  }

  addReviewProduct = (title,content, productId) => {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    if(currentUser) {
      let headers = new Headers({
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Token': currentUser.access_token,
        'Uid': currentUser.uid,
        'Provider': currentUser.provider
      });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(`${environment.apiURL}/comments`, JSON.stringify({content: content, title: title, product_id: productId }), options)
      .map((response: Response) => {
        let _body = response.json();
        this.reviews.comments.push(_body.comment);
        this._reviewSubject.next(this.reviews);
      })
      .catch((err: Response) => {
        this.api.setNotification("red","Unauthorize!, You do not have permission to perform this operation!")
        return Observable.throw(err);
      });
    }
  }

  editReviewProduct = (id,title,content) => {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    if(currentUser) {
      let headers = new Headers({
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Token': currentUser.access_token,
        'Uid': currentUser.uid,
        'Provider': currentUser.provider
      });
      let options = new RequestOptions({ headers: headers });
      return this.http.patch(`${environment.apiURL}/comments/${id}`, JSON.stringify({content: content, title: title}), options)
      .map((response: Response) => {
        let _body = response.json();
        var filterReviews=this.reviews.comments.filter(item => item.id != id);
        this.reviews.comments=filterReviews;
        this.reviews.comments.push(_body.comment);
        this._reviewSubject.next(this.reviews);
      });
    }
  }

  deleteReviewProduct = (id, product_id) => {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    if(currentUser) {
      let headers = new Headers({
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Token': currentUser.access_token,
        'Uid': currentUser.uid,
        'Provider': currentUser.provider
      });
      let params = new URLSearchParams();
      params.set('product_id', product_id);
      let options = new RequestOptions({ headers: headers });
      options.search = params;
      return this.http.delete(`${environment.apiURL}/comments/${id}`, options)
      .map((response: Response) => {
        var filterReviews=this.reviews.comments.filter(item => item.id != id);
        this.reviews.comments=filterReviews;
        this._reviewSubject.next(this.reviews);
      });
    }
  }

  setRating = (rating, product_id) => {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (currentUser) {
      let headers = new Headers({
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Token': currentUser.access_token,
        'Uid': currentUser.uid,
        'Provider': currentUser.provider
      });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(`${environment.apiURL}/rating`, JSON.stringify({product_id: product_id, rating: rating, user_id: currentUser.user_id }), options)
      .catch((err: Response) => {
        this.api.setNotification("red","Rating Failed!")
        return Observable.throw(err);
      });
    }
  }

  setRatingShop = (review, obj_rating, shop_id) => {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (currentUser) {
      let headers = new Headers({
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Token': currentUser.access_token,
        'Uid': currentUser.uid,
        'Provider': currentUser.provider
      });
      let options = new RequestOptions({ headers: headers });
      console.log(obj_rating, shop_id);
      return this.http.post(`${environment.apiURL}/rating_shops`, JSON.stringify({ review: review, user_id: currentUser.user_id, obj_rating: obj_rating, shop_id: shop_id }), options)
      .catch((err: Response) => {
        this.api.setNotification("red","Rating Failed!")
        return Observable.throw(err);
      });
    }
  }
}
