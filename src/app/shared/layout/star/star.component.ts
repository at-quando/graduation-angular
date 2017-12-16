import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import * as $ from 'jquery';

@Component({
  selector: 'star-review',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  @Input('rate') rate: any;
  @Input('type') type: any;
  @Output() result: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
  }

  ngOnInit() {
    if ( this.type == 1) {
    console.log(this.rate);
    }
  }

  getRating(num) {
    this.result.emit(num);
    this.rate = num;
  }
}
