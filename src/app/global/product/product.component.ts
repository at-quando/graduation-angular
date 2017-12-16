import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { PaginationComponent } from '../../shared/layout/pagination/pagination.component';
import { ProductListComponent } from '../product/product-list/product-list.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  id: any;
  sub: any;
  subs: any;
  title: any;
  page: any;
  brandId: any = 0;
  count: number;
  pageNumber: number;
  brand: any;

  
  constructor(private route: ActivatedRoute, private _product: ProductService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
