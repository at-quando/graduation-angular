import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmEmailService } from '../../shared/services/confirm-email.service';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  providers: [ConfirmEmailService]
})
export class ConfirmEmailComponent implements OnInit {
  sub: any;
  subs: any;
  token: any;
  success: any;
  uid: any;
  provider: any;

  constructor(private route: ActivatedRoute, private confirm_email: ConfirmEmailService) {
    this.sub = this.route.params.subscribe(params => {
      this.token = params['token'];
      this.uid = params['uid'];
      this.provider = params['provider'];
      console.log(this.token, this.uid);
    });
    this.confirm_email.checkToken(this.token, this.uid, this.provider).subscribe(data => {});
    this.subs = this.confirm_email._success.subscribe((value => { this.success = value }));

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
