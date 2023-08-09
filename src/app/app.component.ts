import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { IdleService } from './idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showAlert = false;

  constructor(private idleService: IdleService) {}

  ngOnInit(): void {
    this.idleService.startIdleTimer();

    this.idleService.resetTimer.subscribe(() => {
      this.showAlert = true;
      console.log(this.showAlert);
    });
  }

  resetAlert(){
    this.showAlert = false;
  this.idleService.resetAlertTrigger();
  this.idleService.startIdleTimer();
 }

  
}
