import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@Component({
  selector: 'app-appversion',
  templateUrl: './appversion.component.html',
  styleUrls: ['./appversion.component.scss'],
})
export class AppversionComponent implements OnInit {

  private appName;
  private vCode
  private vNumber;
  private package;

  constructor(private appVersion: AppVersion) {
    console.log("Native Component Loading: App Version");
    this.appVersion.getAppName().then(value => {
      this.appName = value;
    }).catch(err => {
      alert(err); 
    });

    this.appVersion.getPackageName().then(value => {
      this.package = value;
    }).catch(err => {
      alert(err); 
    });

    this.appVersion.getVersionCode().then(value => {
      this.vCode = value;
    }).catch(err => {
      alert(err); 
    });

    this.appVersion.getVersionNumber().then(value => {
      this.vNumber = value;
    }).catch(err => {
      alert(err); 
    });
  }

  ngOnInit() {}

}
