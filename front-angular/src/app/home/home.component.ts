import { Component, OnInit } from '@angular/core';

import { ExplorerModel } from '../explorer/explorer.model';
import { ExplorerService } from '../explorer/explorer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  explorer: ExplorerModel;
  qrMainAddress: string;

  constructor(
    private explorerService: ExplorerService
  ) {}

  ngOnInit() {
    this.showUSD();
    this.showBTC();
    this.qrMainAddress = 'navcoin:NaSdzJ64o8DQo5DMPexVrL4PYFCBZqcmsW';
  }

  showUSD() {
    this.explorerService.getUSD()
      .subscribe(
        (data: number) => {
          this.explorer = {
            ...this.explorer,
            tickerUSD: data
          };
        }, error => {
          console.log('error: ', error);
        }
      );
  }

  showBTC() {
    this.explorerService.getBTC()
      .subscribe(
        (data: number) => {
          this.explorer = {
            ...this.explorer,
            tickerBTC: data
          };
        },
        error => {
          console.log('error: ', error);
        }
      );
  }

  }
