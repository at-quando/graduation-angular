import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { OrdersService } from '../../../shared/services/orders.service';
import { PaginationComponent } from '../../../shared/layout/pagination/pagination.component';

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  providers: [ProductService, OrdersService]
})
export class ListPageComponent implements OnInit {
  id: any;
  subs: any;
  products: any;
  title: any;
  sub: any;
  page: any;
  brandId: any = 0;
  count: number;
  pageNumber: number;
  brand: any;

  // tslint:disable-next-line:no-input-rename
  constructor(
    private _product: ProductService,
    private _order: OrdersService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  add_to_cart(item: any, quantity: number) {
    this._order.addToCart(item, quantity);
  }

  topPage() {
     window.scrollTo(0, 0);
  }
}
