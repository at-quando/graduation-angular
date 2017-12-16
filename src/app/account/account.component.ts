import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentUserActionService } from '../shared/services/current-user-action.service';
import { ApiService } from '../shared/services/api.service';
import { InforComponent } from './infor/infor.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [ CurrentUserActionService ]
})
export class AccountComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userAction: CurrentUserActionService,
              private api: ApiService) {
  }

  ngOnInit() {
  }
}
