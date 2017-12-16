import { Component, OnInit, Input } from '@angular/core';
import {BehaviorSubject, Subject, Subscriber} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  subs: any;
  name: any;
  pageNumber: any;
  pages: any;
  pageActive: any;
  count: any;
  brandId: number;

  constructor(private route: ActivatedRoute, private _product: ProductService) { 
    this.pages=[];
    }

  ngOnInit() {
    this.subs = this.route.params.subscribe(params => {
      this.name = params['name'];
      if(params['brand_id'] != null) {
        this.brandId = +params['brand_id'];
      }
      else {
        this.brandId = 0;
      }
      if(!+params['page']) {
        this.pageActive = 1;
      }
      else {
        this.pageActive = +params['page'];
      }
    });
  }
 
  setPageNumber(num) {
    window.scrollTo(0,0);
    this.pages=[];
    this.pageNumber=num;
    for(let i=1; i<=this.pageNumber;i++) {
        this.pages.push(i);
    }
  }
}
