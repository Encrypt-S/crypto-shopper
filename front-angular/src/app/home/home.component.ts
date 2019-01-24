import { Component, OnInit } from '@angular/core';

import { RatesModel } from '../explorer/rates.model';
import { ExplorerService } from '../explorer/explorer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  rates: RatesModel;
  qrMainAddress: string;

  constructor(
    private explorerService: ExplorerService
  ) {}

  ngOnInit() {
    this.showNavRates();
    this.qrMainAddress = 'navcoin:NaSdzJ64o8DQo5DMPexVrL4PYFCBZqcmsW';
  }

  showNavRates() {
    this.explorerService.getRates('NAV')
      .subscribe((rates: any) => this.rates = rates.data);
  }



}
