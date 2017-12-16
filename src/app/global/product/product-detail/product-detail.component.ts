import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { ProductService } from '../../../shared/services/product.service';
import { OrdersService } from '../../../shared/services/orders.service';
import { ReviewService } from '../../../shared/services/review.service';
import { ImageZoomModule } from 'angular2-image-zoom';
import * as $ from 'jquery';
import { ListPageComponent } from '../list-page/list-page.component';
import { ReviewComponent } from '../../review/review.component';
import { PercentPipe } from '../../../shared/pipe/percent.pipe';

declare var Drift: any;
declare var flying: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [ProductService, OrdersService, ReviewService]
})

export class ProductDetailComponent implements OnInit {
  quantity: number;
  sub: any;
  category: any;
  id: any;
  ids: any;
  product: any;
  productComparedList: any;
  property: any;
  zoomImage: any;
  productAnalyze: any;
  productRecommend: any;
  transfer: any;
  rated: any;
  currentUser: any;
  personal: any;


  @ViewChild(ListPageComponent) listPage: ListPageComponent;
  @ViewChild(ReviewComponent) reviewList: ReviewComponent;
  constructor(
    private route: ActivatedRoute,
    private _product: ProductService,
    private _order: OrdersService,
    private _review: ReviewService) {
    this.quantity = 1;
    this.productAnalyze = {};
  }

  ngOnInit() {
    var color = document.getElementById('propertycolorist');
    this.currentUser = JSON.parse(localStorage.getItem('current_user'));
    this.sub = this.route.params.subscribe(params => {
      this.ids = params['id'];
      this._product.getOneProduct(this.ids).subscribe(data => {});
      this._product._oneProductSubject.subscribe(obj => {
        this.transfer = obj;
        console.log(this.transfer);
        this.product = this.transfer.product;
        if (this.transfer.meta) {
          this.rated = this.transfer.meta;
          this.personal = this.rated.rated;
        }
        this.category = this.product.category.title.toUpperCase();
        this.property = this.product.properties;
        $(document).ready(function() {
          // tslint:disable-next-line:no-unused-expression
          new Drift(document.querySelector('.drift-demo-trigger'), {
            paneContainer: document.querySelector('.detail'),
            inlinePane: 900,
            inlineOffsetY: -85,
            containInline: true,
            hoverBoundingBox: true,
            hoverDelay: 0,
            touchDelay: 0
          });
        });
        this._product.getRecommendProduct(this.category, this.ids, this.product.brand.id).subscribe(obj => {});
        this._product._recommendProductSubject.subscribe(obj => {
          this.productRecommend = obj;
          this.listPage.products = this.productRecommend;
        });
        this.setProperty(this.property);
        this.zoomImage = this.product.properties[0].images[0].image;
        setTimeout(()=>{$('.drift-demo-trigger').attr('data-zoom', 'http://res.cloudinary.com/asian-tech/image/upload/' + this.zoomImage)},100);
        setTimeout(()=>{this.showColor(Object.keys(this.productAnalyze)[0])},50);
      });
    });
  }

  ngAfterViewInit() {
    
  }

  minusQuantity() {
    if(this.quantity > 0) {
      this.quantity--;
    }
  }

  plusQuantity() {
    this.quantity++;
  }

  add_to_cart(item: any) {
    this._order.addToCart(item, this.quantity);
  }

  toggleImage(src) {
    this.zoomImage= src;
    $('.drift-demo-trigger').attr('data-zoom', 'http://res.cloudinary.com/asian-tech/image/upload/' + this.zoomImage);
  }

  ngDestroy() {
    this.sub.unsubscribe();
  }
  convertObject(a) {
    if (a == null) {
      return {sale: 0, quantity: 0};
    }
    else {
      return a;
    }
  }

  setProperty(prop) {
    this.productAnalyze = [];
    for(var k in prop) {
      if(this.property[k].storage!=null && this.property[k].size==null) {
        var a=`${this.property[k].storage} GB`;
      }
      else if(this.property[k].storage==null && this.property[k].size!=null) {
        var a = `${this.property[k].size}`;
      }
      var l=a.toString();
      if(!this.productAnalyze[l]) {
        this.productAnalyze[l]=[];
        this.productAnalyze[l].push({id: prop[k].id, price: prop[k].price, color: prop[k].color, sale: this.convertObject(prop[k].discount)});
      }
      else {
        this.productAnalyze[l].push({id: prop[k].id, price: prop[k].price, color: prop[k].color, sale: this.convertObject(prop[k].discount)});
      }
    }
  }

  showColor(prop) {
    if (event) {this.enableClickBtn('item',event.currentTarget)};
    var colorist= document.getElementById('propertycolorist');
    var price= document.getElementById('productprice');
    var priceWithColor= document.getElementById('productprice');
      while (colorist.firstChild) {
        colorist.removeChild(colorist.firstChild);
      }
      while (priceWithColor.firstChild) {
        priceWithColor.removeChild(priceWithColor.firstChild);
      }
    for( var k in this.productAnalyze[prop]) {
      //color property 
      var div= document.createElement('div');
      div.classList.add('filled-circle');
      div.style.backgroundColor=this.productAnalyze[prop][k].color;
      colorist.appendChild(div);
      //price property
      var divPrice= document.createElement('div');
      divPrice.classList.add('price');
      divPrice.setAttribute('data-info',this.productAnalyze[prop][k].id);
      divPrice.onclick= () => { 
        this.id=$(divPrice).attr('data-info');
        this.enableClickBtn('price',event.currentTarget);
       };
      var span=document.createElement('span');
      var h5=document.createElement('h5');
      if(this.productAnalyze[prop][k].sale.sale != 0) {
        var span1=document.createElement('span');
        span1.innerHTML= `$${this.productAnalyze[prop][k].price}`;
        span1.style.textDecoration="line-through";
        span1.style.cssFloat= "left";
        var total=(this.productAnalyze[prop][k].price*(1-this.productAnalyze[prop][k].sale.sale)).toFixed(2);
        var text =`$${total}`;
        divPrice.appendChild(span1);
      }
      else {
        var text = `$${this.productAnalyze[prop][k].price}`;
      }
      h5.innerHTML= text;
      let percentPipe = new PercentPipe();
      span.innerHTML= percentPipe.transform(this.productAnalyze[prop][k].sale.sale) + ' ' + this.productAnalyze[prop][k].color;
      divPrice.appendChild(h5);
      divPrice.appendChild(span);
      priceWithColor.appendChild(divPrice);
    }
    var items= document.getElementsByClassName('price');
    items[0].classList.add('active');
    this.id=this.productAnalyze[prop][0].id;
  }

  enableClickBtn(cls,obj) {
    var items= document.getElementsByClassName(cls);
    for(var i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
    }​
    $(obj).addClass('active');
  }

  addToCart(product, event) {
    const props = product.properties.filter(item => item.id == this.id);
    product.properties = props;
    this._order.addToCart(product, this.quantity);
  }

  addToCompared(product, event) {
    const props = product.properties.filter(item => item.id == this.id);
    product.properties = props;
    this._order.addToCompared(product, this.quantity);
  }

  setRated(e: any) {
    this._review.setRating(e, this.product.id).map((response: Response) => {
        this.personal = response.json().point;
      })
      .subscribe(data => {});
  }
}
