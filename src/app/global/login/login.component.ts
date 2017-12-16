import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authenticate.service';
import { User } from '../../shared/models/User' ;
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService, ApiService]
})
export class LoginComponent {
  user_name: any;
  private sub: any;
  uid: string = '';
  pass: string = '';
  uidCreate: string = '';
  passCreate: string = '';
  user: User;
  constructor(private _authentication: AuthenticationService, private api: ApiService) {
    this.user = {
      name: '',
      phone: '',
      gender: 0,
      address: '',
      avatar: null
    };
 }

  ngAfterViewInit() {
    this.closeLoginForm();
  }

  closeLoginForm() {
    const login = document.getElementById('modal-in');
    login.style.display = 'none';
    window.onscroll = function() { };
  }

  login() {
    this._authentication.login(this.uid, this.pass).subscribe(
      data => {},
      error => {
        if (error) {
          const noti = document.getElementById('noti-danger');
          noti.style.display = 'block';
          setTimeout(function(){ noti.style.display = 'none'; }, 2000);
        }
      }
      );
  }

  signup(model) {
    this.user.gender = Number(this.user.gender);
    this._authentication.signup(this.user, model.email, model.password).subscribe(data=>{});
   $('#modal-in').fadeOut('2000');
   this.api.setNotification('green', 'Success to sign up, please check your email to confirm account!');
  }

  enableForm(login, signup) {
    const a = document.getElementById(login);
    const b = document.getElementById(signup);
    const navLogin = document.getElementById(`nav-${login}`);
    const navSignup = document.getElementById(`nav-${signup}`);
    a.style.display = 'none';
    b.style.display = 'block';
    navLogin.classList.remove('actived');
    navSignup.classList.add('actived');
  }

  ngDestroy() {
    this.sub.unsubscribe();
  }
}
