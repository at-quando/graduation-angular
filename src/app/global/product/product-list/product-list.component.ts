import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { OrdersService } from '../../../shared/services/orders.service';
import { PaginationComponent } from '../../../shared/layout/pagination/pagination.component';
import { ListPageComponent } from '../list-page/list-page.component';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService, OrdersService]
})
export class ProductListComponent implements OnInit {
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
  @ViewChild(ListPageComponent) listPage: ListPageComponent;
  @ViewChild(PaginationComponent) pagination: PaginationComponent;
  constructor(
    private _product: ProductService,
    private _order: OrdersService,
    private route: ActivatedRoute
  ) {
    this.products = [];
    this.subs = this.route.params.subscribe(params => {
      this.title = params['name'];
      this.page = +params['page'];
      if (params['brand_id'] != 0) {
        this.brandId=+params['brand_id'];
      }
      else {
        this.brandId = 0;
      }
      this._product.getProduct(this.title, this.page, this.brandId).subscribe(data => {});
      this._product._productSubject.subscribe(items => {
        this.products = items;
        this.listPage.products = this.products;
      });

      this._product._count.subscribe(count => {
        this.count = count;
        this.pageNumber = Math.ceil(this.count/8);
        this.pagination.setPageNumber(this.pageNumber);
      });
    });
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
