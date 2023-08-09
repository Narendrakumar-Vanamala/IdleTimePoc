import { Component } from '@angular/core';
import { IdleService } from '../idle.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  constructor(private idleService:IdleService){
      
  }


  resetAlert(): void {
    this.idleService.resetAlertTrigger(); // Reset the flag to allow triggering again
  }
}
