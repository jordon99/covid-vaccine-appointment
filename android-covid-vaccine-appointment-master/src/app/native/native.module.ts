import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppversionComponent } from './appversion/appversion.component';
import { BatteryComponent } from './battery/battery.component';



@NgModule({
  declarations: [AppversionComponent, BatteryComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AppversionComponent, BatteryComponent]
})
export class NativeModule { }
