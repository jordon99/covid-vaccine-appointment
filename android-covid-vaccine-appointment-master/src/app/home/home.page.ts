import { AppointmentService } from './../services/appointment.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  agentId: string;
  appKey: string;

  appointments: any[] = [];
  count: number = 0;

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private toastController: ToastController
  ) {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getCount().subscribe(count => this.count = count);
    this.appointmentService.getAppointments().subscribe((appointments) => this.appointments = appointments);
  }

  loadAppointmentsFromFile(): void {
    this.appointmentService.loadFromFile().subscribe(async (appointments) => {
      if(appointments.length) {
        console.log("Appointments loaded from file: ", appointments.length);
        for (var i = 0; i < appointments.length; i++) {
          let appointment = appointments[i];
          await this.appointmentService.addAppointment(appointment);
          console.log(`Added appointment #${i} to native storage: `, appointment);
        }
      }

      let toast = await this.toastController.create({
        message: 'Data loaded from file.',
        duration: 2000
      });
      toast.present();
    })
  }

  gotoBooking(): void {
    this.router.navigate(['/booking'], { queryParams: { agentId: this.agentId } });
  }

  async deleteAppointment() {
    if(!this.appKey) {
      (await this.toastController.create({
        message: 'Please enter appointment key to delete.',
        duration: 2000
      })).present();

      return;
    }

    this.delete(this.appKey);
  }

  async delete(key: string) {
    this.appointmentService.deleteAppointment(key);
    (await this.toastController.create({
      message: 'Appointment deleted successfully.',
      duration: 2000
    })).present();
  }
}
