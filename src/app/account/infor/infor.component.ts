import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { CurrentUserActionService } from '../../shared/services/current-user-action.service';
import { ApiService } from '../../shared/services/api.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

@Component({
  selector: 'app-user-infor',
  templateUrl: './infor.component.html',
  styleUrls: ['./infor.component.scss'],
  providers: [ CurrentUserActionService ]
})
export class InforComponent implements OnInit {
  id: any;
  uid: any;
  user: User;
  userCurrent: User;
  imageId: any;

  uploader: CloudinaryUploader  = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'asian-tech', uploadPreset: 'vuqzhe3p' })
    )

  constructor(private userAction: CurrentUserActionService,
    private api: ApiService,
    private router: Router
    ) {
    this.imageId = null;
    this.user = {
      name: '',
      phone: '',
      gender: 0,
      address: '',
      avatar: ''
    };
    this.userAction.getUserInfo(this.id).subscribe(data => {});
    this.userAction._personalInfo.subscribe(userInfo => {
      if(userInfo) {
        this.uid = JSON.parse(localStorage.getItem('current_user')).uid;
        this.user = userInfo;
      }
    })

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      this.user.avatar = res.public_id;
      this.imageId = res.public_id;
      return { item, response, status, headers };
    }
  }

  ngOnInit() {
  }

  editUserInfo(model,f) {
    if(f) {
      if(this.uploader.queue.length > 0){
        this.uploader.uploadAll();
        setTimeout(() => {
          this.userAction.editUserInfo(this.user,this.id).subscribe(data => {});
        }, 5000)
      }
      else {
        this.userAction.editUserInfo(this.user,this.id).subscribe(data => {});
      }
    }
    else {
      this.api.setNotification("yellow", "Nothing happened! Your information is up to date! ");
    }
  }   
}
