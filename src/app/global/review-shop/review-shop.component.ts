import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../shared/services/review.service';
import { ApiService } from '../../shared/services/api.service';
import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'review-shop',
  templateUrl: './review-shop.component.html',
  styleUrls: ['./review-shop.component.scss'],
  providers: [ReviewService]
})

export class ReviewShopComponent implements OnInit {
  @Output() closeModal: EventEmitter<number> = new EventEmitter<number>();
  id: Number;
  reviewObj: any;
  review: any;

  constructor(private _review: ReviewService, private route: ActivatedRoute) {
    this.reviewObj = {
      quality: 0,
      warranty: 0,
      delivery: 0,
      service: 0
    };
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  setRated(a, e) {
    if (a === 1) {
      this.reviewObj.quality = e;
    }
    if (a === 2) {
      this.reviewObj.warranty = e;
    }
    if (a === 3) {
      this.reviewObj.delivery = e;
    }
    if (a === 4) {
      this.reviewObj.service = e;
    }
  }

  closeMe(num) {
    this.closeModal.emit(num);
  }

  submitForm() {
    console.log(this.review);
    this._review.setRatingShop(this.review, this.reviewObj, this.id).subscribe(data => {});
    this.closeModal.emit();
  }
}
