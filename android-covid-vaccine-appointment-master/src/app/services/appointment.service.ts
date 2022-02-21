import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private fileUrl = 'assets/data/data.json';

  private appointments$ = new BehaviorSubject<any[]>([]);
  private count$ = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private nativeStorage: NativeStorage
  ) {
    nativeStorage.clear();
    this.loadAppointments();
  }

  loadFromFile() {
    return this.http.get(this.fileUrl).pipe(map(
      (res: any) => {
        console.log("Data from file: ", res);
        return res.data;
      }
    ))
  }

  async loadAppointments() {
    let count = await this.getNativeStorageLength();
    let appointments = [];

    if(count > 0) {
      for (var i = 0; i < count; i++) {
        let key = await this.getAppointmentKey(i);
        let appointment = await this.getAppointment(key);
        appointments.push({key: key, ...appointment});
      }
    }

    this.appointments$.next(appointments);
    this.count$.next(appointments.length);
  }

  getAppointments(): Observable<any[]> {
    return this.appointments$.asObservable();
  }

  getCount(): Observable<number> {
    return this.count$.asObservable();
  }

  async addAppointment(data: any) {
    let count = await this.getNativeStorageLength();
    let key = `App${count}`;
    await this.nativeStorage.setItem(key, JSON.stringify(data));

    console.log(`Fn addAppointment() nsLength: ${count}`);
    this.loadAppointments();
  }

  getAppointment(key: string): any {
    return this.nativeStorage.getItem(key).then(appt => JSON.parse(appt));
  }

  getAppointmentKey(i: number): any {
    return this.nativeStorage.keys().then(allKeys => allKeys[i]);
  }

  getNativeStorageLength() : any {
    return this.nativeStorage.keys().then(allKeys => allKeys.length);
  }

  deleteAppointment(key: string) {
    this.nativeStorage.remove(key).then((removedApp)=>{
      console.log("Removed appointment: ",key);
      this.loadAppointments();
    });
  }
}
