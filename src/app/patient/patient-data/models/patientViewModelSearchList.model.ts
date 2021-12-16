export class patientViewModelSearchList {
	public key: string;
	public name: string;
	public phone: string;
  public scheduleStart: Date;
  public executed: boolean;
  public confirmed: boolean;
  public description: string;
  public lineSchedule: boolean;
  public scheduleDuration: number;

  constructor(_key : string,
              _name: string ,
              _phone: string,
              _scheduleStart: Date,
              _executed: boolean,
              _confirmed: boolean,
              _description : string,
              _lineSchedule: boolean,
              _scheduleDuration: number) {

     this.key = _key;
     this.name = _name;
     this.phone = _phone
     this.scheduleStart = _scheduleStart;
     this.executed = _executed;
     this.confirmed = _confirmed;
     this.description = _description;
     this.lineSchedule = _lineSchedule;
     this.scheduleDuration = _scheduleDuration;

  }
}
