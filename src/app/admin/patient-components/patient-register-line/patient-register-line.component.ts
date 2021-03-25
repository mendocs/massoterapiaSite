import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { patientList } from 'src/app/patient/patient-data/models/patientviewModelList.model';
import { schedule } from 'src/app/patient/patient-data/models/schedule.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-register-line',
  templateUrl: './patient-register-line.component.html',
  styleUrls: ['./patient-register-line.component.scss']
})
export class PatientRegisterLineComponent implements OnInit {

  @Input() patientRegisters: patientList[];

  whatsapplink : string;

  public href: string = "";




  constructor() { }

  ngOnInit(): void {


    this.href = environment.pathUrl;

    this.whatsapplink = environment.whatsapplink;



  }

  getDateFormated(patientCurrent: patientList) : string
  {
    //const index = patientCurrent.schedules.length-1;
    let data : Date = new Date(this.getNextSchedule(patientCurrent).startdDate.toString());
    return `${data.getDate()}/${ (data.getMonth() + 1) }/${data.getFullYear()} as ${data.getHours()}:${data.getMinutes()}`;

  }

  getLastSchedule(patientCurrent: patientList) : schedule
  {
    const index = patientCurrent.schedules.length-1;
    return patientCurrent.schedules[index];

  }


  getNextSchedule(patientCurrent: patientList) : schedule
  {

    let returnnedValue : schedule = null;

    patientCurrent.schedules.every(scheduleCurrent => {
      if (new Date(scheduleCurrent.startdDate) > new Date())
      {
        returnnedValue = scheduleCurrent;
        return false;
      }
    });


    if (returnnedValue !== null)
      return returnnedValue;
    else
      return this.getLastSchedule(patientCurrent);

  }

}
