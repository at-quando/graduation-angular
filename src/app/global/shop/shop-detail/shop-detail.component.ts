import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { ShopsService } from '../../../shared/services/shops.service';
import { ProductService } from '../../../shared/services/product.service';
import { ListPageComponent } from '../../product/list-page/list-page.component';
import { PaginationComponent } from '../../../shared/layout/pagination/pagination.component';
import { environment } from '../../../../environments/environment';
declare var google: any;

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
  providers: [ShopsService, ProductService]
})
export class ShopDetailComponent implements OnInit {
  id: number;
  shop: any;
  products: any;
  page: number;
  url: any;
  isReviewDisplay: boolean;
  reviewers: any;


  @ViewChild(PaginationComponent) pagination: PaginationComponent;
  @ViewChild(ListPageComponent) productList: ListPageComponent;
  constructor(private route: ActivatedRoute,
    private shopsService: ShopsService,
    private productService: ProductService,
    private router: Router) {
      this.isReviewDisplay = false;
      this.reviewers = [];
  }

  ngOnInit() {
    this.url = this.router.url;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.page =+params['page'];
      this.shopsService.getShop(this.id).subscribe(data => {});
      this.shopsService._shopSubject.subscribe(shop => {
        this.shop = shop;
        $(document).ready(() => {
         let geocoder = new google.maps.Geocoder();
         let address = shop.address;
          geocoder.geocode({ 'address' : address }, (results, status) => {
            if(status == google.maps.GeocoderStatus.OK) {
             var latitude = results[0].geometry.location.lat();
             var longitude = results[0].geometry.location.lng();
            }
           let mapCanvas = document.getElementById('map');
           let location = new google.maps.LatLng(latitude, longitude);
           let mapOptions = {
              center: location,
              zoom: 17,
              panControle: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
           let markerIcon = {
              url: 'http://image.flaticon.com/icons/svg/252/252025.svg',
              scaledSize: new google.maps.Size(80, 80),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(32, 65),
              labelOrigin:  new google.maps.Point(40, 33),
            };
           let map = new google.maps.Map(mapCanvas, mapOptions);
           let markerLabel = 'GO!';
           let marker = new google.maps.Marker({
              position: location,
              draggable: true,
              animation: google.maps.Animation.DROP,
              map: map,
              icon: markerIcon,
              label: {
                text: markerLabel,
                color: "#eb3a44",
                fontSize: "16px",
                fontWeight: "bold",
              }
            });
            marker.addListener('click', () => {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            });
           let contentString = '<div class="info-window" style="border-radius: 5px;">' +
            `<div style="float: left;width: 25%">
            <img src="${shop.logo}" style="width: 70px; height: auto;">
            </div>` + 
            `<div style="float:left;width: 70%;margin-left: 5%;color: gray; font-size: 16px">` +
            `<span style="display: inline-block">Shop's name: ${shop.name}</span>` + 
            `<span style="display: inline-block">Shop's address: ${shop.address}</span>` +
            `</div>` +
            `</div>`;
           let inforWindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 250,
            });
            marker.addListener('click', () => {
              inforWindow.open(map, marker);
            });
          });
        });
      });
      this.productService.getProductByShop(this.id, this.page).subscribe(data => {});
      this.productService._ProductByShopSubject.subscribe(product => {
        if (product && this.productList) {
          this.products = product;
          this.productList.products = this.products;
        }
      });
      this.productService._countShop.subscribe(count => {
        if (this.pagination) {
          this.pagination.setPageNumber(Math.ceil(count/12));
        }
      });
      this.productService.getReviewer(this.id).map((response: Response) => {
        this.reviewers = response.json();
        if (!Array.isArray(this.reviewers)) {
          this.reviewers = [];
        }
      }).subscribe(data => {});
    });
  }

  closeEvent(e: any) {
    this.isReviewDisplay = false;
  }
}
