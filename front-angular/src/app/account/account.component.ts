import { Component, OnInit } from '@angular/core';

import { AccountModel } from '../account/account.model';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: AccountModel;

  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.showAccountInfo();
  }

  showAccountInfo() {
    this.accountService.getAccountInfo()
      .subscribe(
        (data: number) => {
          this.account = {
            ...data.data
          };
        }, error => {
          console.log('error: ', error);
        }
      );
  }

}
