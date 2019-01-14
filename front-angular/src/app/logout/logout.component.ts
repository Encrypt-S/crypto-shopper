import { Component, OnInit } from '@angular/core';

import { LoginModel } from '../login/login.model';
import { AuthService } from '../auth/auth.service';
import { AuthReceive } from '../auth/auth-receive.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  login = new LoginModel();
  authReceive: AuthReceive;

  submitted = false;

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('token');
  }

}
