import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { patientList } from 'src/app/patient/patient-data/models/patientviewModelList.model';
import { schedule } from 'src/app/patient/patient-data/models/schedule.model';
import { environment } from 'src/environments/environment';
import { UtilsService } from "../../../shared-kernel/tools/utils.service";
import { patientViewModelSearchList } from 'src/app/patient/patient-data/models/patientViewModelSearchList.model';

@Component({
  selector: 'app-patient-register-line',
  templateUrl: './patient-register-line.component.html',
  styleUrls: ['./patient-register-line.component.scss']
})
export class PatientRegisterLineComponent implements OnInit {

  @Input() patientRegisters: patientList[];
  @Input() SearchDateRange: Date[] = [];

  patientViewModelSearchListFromDB: patientViewModelSearchList[];
  patientViewModelSearchListFromDBCount : number = 0;

  whatsapplink : string;

  public href: string = "";

  constructor(private utilsService : UtilsService) {}

  ngOnInit(): void {

    this.href = environment.pathUrl;

    this.whatsapplink = environment.whatsapplink;

    this.patientViewModelSearchListFromDB = this.getScheduleInRange(this.patientRegisters,this.SearchDateRange)

    if (this.SearchDateRange?.length==2)
      this.patientViewModelSearchListFromDB = this.setIntervalDescription(this.patientViewModelSearchListFromDB);
  }

  getDateFormated(patientCurrent: patientList) : string
  {
    let data : Date = new Date(this.getNextSchedule(patientCurrent).StartdDate.toString());
    return this.utilsService.getDateFormated(data);
  }


  getDateFormatedToShow(dateBase: Date) : string
  {
    return this.utilsService.getDateFormated(dateBase);
  }




  getLastSchedule(patientCurrent: patientList) : schedule
  {
    const index = patientCurrent.Schedules.length-1;
    return patientCurrent.Schedules[index];

  }

  compareDateScheduleToShow(dateBase: Date, dateVerification: Date[]): boolean
  {
    if (dateVerification && dateVerification.length==2)
      return ( new Date(dateBase) >= new Date(dateVerification[0]) && new Date(dateBase) <= new Date(dateVerification[1]))
    else
      return true;

  }





  getScheduleInRange(patienties: patientList[], dateRange : Date[]) : patientViewModelSearchList[]
  {
    this.patientViewModelSearchListFromDBCount = 0;
    let _patientViewModelSearchListFromDB : patientViewModelSearchList[] = [];

    patienties.map(patientCurrent =>
      patientCurrent.Schedules
        .sort((a,b)=> new Date(a.StartdDate).getTime() - new Date(b.StartdDate).getTime())
        .map((scheduleCurrent,index) => {
          if (!scheduleCurrent.Canceled  && this.compareDateScheduleToShow(scheduleCurrent.StartdDate,dateRange))
          {
            const _patientViewModelSearchList: patientViewModelSearchList = new patientViewModelSearchList(
                                                                                                    patientCurrent.Key,
                                                                                                    `${patientCurrent.Name} (${patientCurrent.Schedules.length}) `,
                                                                                                    patientCurrent.Phone,
                                                                                                    new Date(scheduleCurrent.StartdDate),
                                                                                                    scheduleCurrent.Executed,
                                                                                                    scheduleCurrent.Confirmed,
                                                                                                    `${this.utilsService.getDateFormated(scheduleCurrent.StartdDate)} (${index +1})`,
                                                                                                    true);
            _patientViewModelSearchListFromDB.push(_patientViewModelSearchList);
            this.patientViewModelSearchListFromDBCount++;

            if (dateRange && dateRange.length==2)
            {
              let patientListt = this.getPatientViewModelSearchList(_patientViewModelSearchList.scheduleStart);
              _patientViewModelSearchListFromDB.push(patientListt);
            }
          }
        }));

    return _patientViewModelSearchListFromDB.sort(
      (a,b)=> new Date(a.scheduleStart).getTime() - new Date(b.scheduleStart).getTime()
      );
  }

  setIntervalDescription(_patientViewModelSearchListFromDB : patientViewModelSearchList[]) : patientViewModelSearchList[]
  {

    let data1 :Date;
    let data2 : Date;

    for (var i = 0; i < _patientViewModelSearchListFromDB.length; i = i+2) {
      try{
        data1 = _patientViewModelSearchListFromDB[i].scheduleStart;
        data2 = _patientViewModelSearchListFromDB[i+2].scheduleStart;
        _patientViewModelSearchListFromDB[i+1].description = this.utilsService.getSchedulAvaliableDescription(data1,data2);
        _patientViewModelSearchListFromDB[i+1].phone = this.utilsService.getIntervalDescription(data1,data2);
      }  catch (e) {}
    }

    return _patientViewModelSearchListFromDB;

  }



  getPatientViewModelSearchList(dateScheduleplus : Date) : patientViewModelSearchList
  {
    let dateSc : Date = new Date(dateScheduleplus)
    dateSc.setMinutes(dateSc.getMinutes() + 1);

    let _patient =  new patientViewModelSearchList(
      "",
      "",
      "",
      dateSc,
      null,
      null,
      "",
      false);

      return _patient;

  }

  getNextSchedule(patientCurrent: patientList) : schedule
  {
    let returnnedValue : schedule = null;
    patientCurrent.Schedules.sort(
      (a,b)=> new Date(a.StartdDate).getTime() - new Date(b.StartdDate).getTime()
      ).every(scheduleCurrent => {
      if (!(scheduleCurrent.Canceled || scheduleCurrent.Executed) && new Date(scheduleCurrent.StartdDate) > new Date(Date.now()))
      {
        returnnedValue = scheduleCurrent;
        return false;
      }
      return true;
    });


    if (returnnedValue !== null)
      return returnnedValue;
    else
      return this.getLastSchedule(patientCurrent);

  }

}
