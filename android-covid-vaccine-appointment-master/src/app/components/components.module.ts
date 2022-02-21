import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { BatteryStatus } from '@awesome-cordova-plugins/battery-status/ngx';
import { NativeModule } from '../native/native.module';


@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    NativeModule
  ],
  exports: [
    HeaderComponent, FooterComponent
  ],
  providers: [AppVersion, BatteryStatus]
})
export class ComponentsModule { }
