import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../../../shared/services/shops.service';

@Component({
  selector: 'shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
  providers: [ShopsService]
})
export class ShopListComponent implements OnInit {
  shops: any;
  constructor(private _shopService: ShopsService) { }

  ngOnInit() {
    this._shopService.getShopsList().subscribe(data => {});
    this._shopService._shopsSubject.subscribe(shops => {
      this.shops = shops;
    });
  }
}
