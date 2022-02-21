import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BatteryStatus, BatteryStatusResponse } from '@awesome-cordova-plugins/battery-status/ngx';

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.scss'],
})

export class BatteryComponent implements OnInit, OnDestroy {

  private subscription; 
  private bLevel;
  private bPlug; 
  private msg;

  constructor(private batteryStatus: BatteryStatus, private changeDetectorRef: ChangeDetectorRef) { 
    console.log("Native Component Loading: Battery Status");
    this.subscription = this.batteryStatus.onChange().subscribe(status => {
      this.bLevel = status.level;
      this.bPlug = status.isPlugged;
      console.log(status.level, status.isPlugged);
      this.msg = this.bPlug?"Charging":"";
      this.changeDetectorRef.detectChanges();
    },
      error => {
      this.msg = 'Failed to get battery info'; 
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
