import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) { }

  apiEndpoint = 'http://localhost:3000/api/account';

  getAccountInfo(accountId){

    const token = localStorage.getItem('token');

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.apiEndpoint, {id: 1}, httpOptions);
  }
}
