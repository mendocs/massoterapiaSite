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
    {
      this.patientViewModelSearchListFromDB = this.setIntervalDescription(this.patientViewModelSearchListFromDB);
      this.patientViewModelSearchListFromDB = this.setFirstIntervalDescription(this.patientViewModelSearchListFromDB);
    }
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

  removeLastName (nameComplete : string) : string{
    return this.utilsService.removeLastName(nameComplete);
  }



  getScheduleInRange(patienties: patientList[], dateRange : Date[]) : patientViewModelSearchList[]
  {
    this.patientViewModelSearchListFromDBCount = 0;
    let _patientViewModelSearchListFromDB : patientViewModelSearchList[] = [];
    let presentDay : number = 0;

    patienties.map(patientCurrent =>
      patientCurrent.Schedules
        .sort((a,b)=> new Date(a.StartdDate).getTime() - new Date(b.StartdDate).getTime())
        .map((scheduleCurrent,index) => {
          if (!scheduleCurrent.Canceled  && this.compareDateScheduleToShow(scheduleCurrent.StartdDate,dateRange))
          {
            const _patientViewModelSearchList: patientViewModelSearchList = new patientViewModelSearchList(
                                                                                                    patientCurrent.Key,
                                                                                                    `${patientCurrent.Name} (${patientCurrent.Schedules.length}) `,
                                                                                                    patientCurrent.Name,
                                                                                                    patientCurrent.Phone,
                                                                                                    new Date(scheduleCurrent.StartdDate),
                                                                                                    scheduleCurrent.Executed,
                                                                                                    scheduleCurrent.Confirmed,
                                                                                                    `${this.utilsService.getDateFormated(scheduleCurrent.StartdDate)} - ${this.utilsService.getDateFormatedHourMinutes(scheduleCurrent.EndDate)} (${index +1})`,
                                                                                                    true,
                                                                                                    scheduleCurrent.Duration,
                                                                                                    `${scheduleCurrent.Protocol} | ${scheduleCurrent.Package}(${scheduleCurrent.PackageSession}) `);
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
    let duration : number;

    let indiceToAdd : number[] = [];
    let descriptionToAdd : string[] = [];

    for (var i = 0; i < _patientViewModelSearchListFromDB.length; i = i+2) {
      try{
        data1 = _patientViewModelSearchListFromDB[i].scheduleStart;
        duration = _patientViewModelSearchListFromDB[i].scheduleDuration;
        data2 = _patientViewModelSearchListFromDB[i+2].scheduleStart;

        _patientViewModelSearchListFromDB[i+1].description = this.utilsService.getSchedulAvaliableDescription(data1,duration,data2);
        _patientViewModelSearchListFromDB[i+1].phone = this.utilsService.getIntervalDescription(data1,duration,data2);


        if (data1.getDate() != data2.getDate())
        {
          _patientViewModelSearchListFromDB[i+1].phone = "";
          _patientViewModelSearchListFromDB[i+1].description = this.utilsService.getSchedulAvaliableDescription(data1,duration,null); + "novo dia";
          indiceToAdd.push(i+2);
          descriptionToAdd.push(this.utilsService.getSchedulAvaliableDescription(null,0,data2));
        }

      }  catch (e) {
        _patientViewModelSearchListFromDB[i+1].description = this.utilsService.getSchedulAvaliableDescription(data1,duration,null);
      }
    }

    indiceToAdd.forEach((currentValue, index) =>
    {
      const novodia = _patientViewModelSearchListFromDB[currentValue  + (index * 2) + 1].scheduleStart.getDate();
      const newLineDay = this.getPatientViewModelSearchListNewDay(descriptionToAdd[index]);
      const newLineEmpty = this.getPatientViewModelSearchListNewDay(". . . D I A . . . " + novodia);
      _patientViewModelSearchListFromDB.splice(currentValue + (index * 2),0, newLineEmpty,newLineDay);
    });


    return _patientViewModelSearchListFromDB;

  }

  getClassNewDayText(_description : string): string
  {
    return _description.indexOf("D I A")>-1 ? "text-light" : "text-success";
  }

  getClassNewDayLine(_description : string): string
  {
    return _description.indexOf("D I A")>-1 ? "bg-dark" : "";
  }


  setFirstIntervalDescription(_patientViewModelSearchListFromDB : patientViewModelSearchList[]) : patientViewModelSearchList[]
  {

    if (_patientViewModelSearchListFromDB.length > 0)
    {
      let patientListt = this.getPatientViewModelSearchList(_patientViewModelSearchListFromDB[0].scheduleStart);

      patientListt.description = this.utilsService.getSchedulAvaliableDescription(null,0,_patientViewModelSearchListFromDB[0].scheduleStart);
      _patientViewModelSearchListFromDB.unshift(patientListt);

      const novodia = _patientViewModelSearchListFromDB[1].scheduleStart.getDate();
      const newLineEmpty = this.getPatientViewModelSearchListNewDay(". . . D I A . . . " + novodia);
      _patientViewModelSearchListFromDB.unshift(newLineEmpty);

      return _patientViewModelSearchListFromDB;
    }

  }

  getPatientViewModelSearchListNewDay(_description : string) : patientViewModelSearchList
  {
    let dateSc : Date = new Date();

    let _patient =  new patientViewModelSearchList(
      "---novo dia---",
      "",
      "",
      "",
      dateSc,
      null,
      null,
      _description,
      false,
      0,
      "");

      return _patient;

  }


  getPatientViewModelSearchList(dateScheduleplus : Date) : patientViewModelSearchList
  {
    let dateSc : Date = new Date(dateScheduleplus)
    dateSc.setMinutes(dateSc.getMinutes() + 1);

    let _patient =  new patientViewModelSearchList(
      "",
      "",
      "",
      "",
      dateSc,
      null,
      null,
      "",
      false,
      0,
      "");

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
