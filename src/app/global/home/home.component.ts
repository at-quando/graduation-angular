import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ListPageComponent } from '../product/list-page/list-page.component';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductService]
})
export class HomeComponent implements OnInit {
  mostSaleProducts: any;
  bestSellerProducts: any;
  highRatedProducts: any;
  clothesTitle: string;
  electronicTitle: string;
  productComponent: any;
  @ViewChildren(ListPageComponent) listPages: QueryList<ListPageComponent>;

  constructor(private _product: ProductService) {
  }

  ngOnInit() {
    this._product.getSaleProduct()
    .map((response: Response) => {
        this.mostSaleProducts = response.json().products;
        this.listPages.toArray()[0].products = this.mostSaleProducts;
    })
    .subscribe(data => {});
    this._product.getRatedProduct()
    .map((response: Response) => {
        this.highRatedProducts = response.json().products;
        this.listPages.toArray()[1].products = this.highRatedProducts;
    })
    .subscribe(data => {});
    this._product.getBuyProduct()
    .map((response: Response) => {
        this.bestSellerProducts = response.json().products;
        console.log(this.listPages.toArray());
        this.listPages.toArray()[2].products = this.bestSellerProducts;
    })
    .subscribe(data => {});
  }

  ngAfterInit() {
  }
}
