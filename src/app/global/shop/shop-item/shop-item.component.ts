import { AppService } from '../../../shared/services/app.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'shop',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  providers: [AppService]
})
export class ShopItemComponent implements OnInit {
  @Input('shop') shop: any;

  constructor(
    private _app: AppService
  ) { }

  ngOnInit() {
  }

  topPage() {
     window.scrollTo(0, 0);
  }
}
