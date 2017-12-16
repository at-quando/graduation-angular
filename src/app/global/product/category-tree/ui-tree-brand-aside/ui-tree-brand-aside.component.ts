import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'ui-tree-brand-aside',
  templateUrl: './ui-tree-brand-aside.component.html',
  styleUrls: ['./ui-tree-brand-aside.component.scss'],
  providers: [ProductService]
})
export class UiTreeBrandAsideComponent implements OnInit {
  private subs: any;
  title: any;
  brands: any;

  constructor(
    private route: ActivatedRoute,
    private _product: ProductService
  ) {
  }

  ngOnInit() {
    this.subs = this.route.params.subscribe(params => {
      this.title = params['name'];
      this._product.getBrand(this.title).subscribe(data => {});
      this._product._brandSubject.subscribe(items => {
        this.brands = items;
      });
    });
  }
}
