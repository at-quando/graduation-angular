import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { ProductOrder } from '../../shared/models/ProductOrder';
import { OrdersService } from '../../shared/services/orders.service';
import { ApiService } from '../../shared/services/api.service';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { PercentPipe } from '../../shared/pipe/percent.pipe';
import { Trans } from '../../shared/models/Transaction';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrdersService, ApiService]
})
export class OrderComponent implements OnInit {
  private productsSubject: any;
  private products: any;
  coupon: string;
  sale: number;
  typePayment: number;
  comp: number;
  isEnable: boolean;
  typeTrans: any;
  receiver: Object;
  listReceiver: any;
  trans: Trans;

  constructor(
    private _order: OrdersService,
    private api: ApiService
    ) {
    this.comp = 1;
    this.isEnable = true;
    this.receiver = {
      'name': '',
      'address': '',
      'phone': ''
    };
    this.trans = {
      'firstname': '',
      'lastname': '',
      'cardNum': null,
      'type': '',
      'expired': {
        'month': null,
        'year': null
        },
      'cvv': null
      };
    }

  ngOnInit() {
    this.productsSubject = this._order.getItem();
    this.productsSubject.subscribe(data => {
      this.products = data;
    });
    this._order.getListReceiver().map((response: Response) => {
      this.listReceiver = response.json();
    }).subscribe(data => {});
  }

  getTotal() {
    return this._order.getTotal();
  }

  getTotalDiscount() {
    return this._order.getTotalDiscount();
  }

  getTotalCoupon() {
    if (this.sale) {
      const total = this._order.getTotalDiscount();
      return total as number * ( 1 - this.sale);
    }
    else {
      return this._order.getTotalDiscount();
    }
  }

  deleteOrderItem(item: any) {
    this._order.deleteItem(item);
  }

  minusQuantity(item: any) {
    this._order.minusQuantity(item);
  }

  plusQuantity(item: any) {
    this._order.plusQuantity(item);
  }

  numberItem() {
    return this._order.numberItemOrder();
  }

  disableScrolling() {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function() { window.scrollTo(x, y); };
  }

  checkCoupon(coupon) {
    this._order.checkCoupon(coupon).map((response: Response) => {
      this.sale = response.json().coupon.sale;
      if (this.sale) {
        var p = document.getElementById('couponText');
        let percentPipe = new PercentPipe();
        p.innerHTML = 'You have ' + percentPipe.transform(this.sale) + ' SALE coupon!';
      }
    }).subscribe(data => {});
  }

  payment() {
    document.getElementById("loading").style.display = "block";
    console.log(this.receiver);
    this._order.payMent(this.receiver, this.trans, this.getTotalCoupon()).map((response: Response) => {
      document.getElementById("loading").style.display = "none";
      if (response.json()['status'] == 'ok') {
        localStorage.removeItem('ordersList');
        this.api.setNotification('green', 'Your order is completed, check your history to see!');
      }
      else {
        this.api.setNotification('red', 'Cannot transaction!');
      }
    }).subscribe(data => {});
  }

  changeOrderComp(value) {
    if (value == 1) {
      this.comp = 1;
    }
    if (value == 2) {
      this.comp = 2;
    }
    if (value == 3) {
      this.comp = 3;
    }
  }

  goToNextComp() {
    if (this.comp == 1 ) {
      let current_user = localStorage.getItem('current_user');
      if(current_user == null) {
        this.api.setNotification('yellow', 'Have you had account?, sign up to join!');
        let modal_in = document.getElementById('modal-in');
        let login = document.getElementById('login');
        let signupForm = document.getElementById('signup');
        let navSignUp = document.getElementById('nav-signup');
        let navLogin = document.getElementById('nav-login');
        login.style.display = 'none';
        modal_in.style.display = 'block';
        signupForm.style.display = 'block';
        navSignUp.classList.add('actived');
        if(navLogin.classList.contains('actived')) {
          navLogin.classList.remove('actived')
        }
        this.disableScrolling();
      }
      else {
        this.comp = 2;
        let btn = <HTMLInputElement> document.getElementById("btn-2");
        btn.disabled = false;
        btn.classList.add("btn-warning");
      }
    }
    else if (this.comp == 2 ) {
      this.comp = 3;
      let btn = <HTMLInputElement> document.getElementById("btn-3");
      btn.disabled = false;
      btn.classList.add("btn-warning");
    }
  }

  chooseReceiver(id) {
    this.receiver['name'] = this.listReceiver.orders[id].receiver;
    this.receiver['address'] = this.listReceiver.orders[id].address;
    this.receiver['phone'] = this.listReceiver.orders[id].phone;
    this.goToNextComp();
  }

  codPayment() {
    this._order.payMentCod(this.receiver, this.getTotalCoupon()).subscribe(data => {
      this.api.setNotification('green', 'Your order is completed, check your history to see!');
      localStorage.removeItem('ordersList');
      location.reload();
    });
  }
}
