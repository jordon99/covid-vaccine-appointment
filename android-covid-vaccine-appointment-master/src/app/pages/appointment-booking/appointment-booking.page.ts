import { ToastController } from '@ionic/angular';
import { AppointmentService } from './../../services/appointment.service';
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.page.html',
  styleUrls: ['./appointment-booking.page.scss'],
})
export class AppointmentBookingPage implements OnInit {

  agentId: string;

  appDate: Date;
  appTime: Time;
  appOHIP: number;
  appEmail: string;
  appPhone: number;

  errors = {
    appDate: '',
    appTime: '',
    appOHIP: '',
    appEmail: '',
    appPhone: ''
  };

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(query => {
      if (query.get('agentId')) {
        this.agentId = query.get('agentId');
      }
    })
  }

  async addAppointment() {
    if (!this.agentId)
      return;

    if (!this.appDate)
      this.errors.appDate = 'Date is required.';

    if (!this.appTime)
      this.errors.appTime = 'Time is required.';

    if (!this.appOHIP)
      this.errors.appOHIP = 'OHIP is required.';
    if (!this.appEmail && !this.appPhone) {
      this.errors.appEmail = 'Email or phone is required.';
    }

    if (this.appDate && this.appTime && this.appOHIP && (this.appEmail || this.appPhone)) {
      this.appointmentService.addAppointment({
        appDate: this.appDate,
        appTime: this.appTime,
        appOHIP: this.appOHIP,
        appEmail: this.appEmail,
        appPhone: this.appPhone,
        appAgent: this.agentId
      });

      (await this.toastController.create({
        message: 'Appointment saved successfully.',
        duration: 2000
      })).present();
      this.reset();
    } else {
      let toast = await this.toastController.create({
        message: (() => {
          let m = '';
          Object.keys(this.errors).forEach((key) => {
            let err = this.errors[key];
            if (err) {
              m += `${err}<br>`;
            }
          })
          return m;
        })(),
        duration: 2000
      });
      toast.present();
    }
  }

  reset() {
    this.errors = {
      appDate: '',
      appTime: '',
      appOHIP: '',
      appEmail: '',
      appPhone: ''
    };

    this.appDate = undefined;
    this.appTime = undefined;
    this.appOHIP = undefined;
    this.appEmail = undefined;
    this.appPhone = undefined;
  }
}
