import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable()
export class ExplorerService {
  constructor(private http: HttpClient) { }

  marketRatesApi = environment.api + '/explorer/market-rates';

  getRates(market) {

    return this.http.post(this.marketRatesApi, {market: market})
  }
}
