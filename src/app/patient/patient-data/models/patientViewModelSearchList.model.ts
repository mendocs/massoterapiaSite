export class patientViewModelSearchList {
	public key: string;
	public name: string;
  public nameClean: string;
	public phone: string;
  public scheduleStart: Date;
  public executed: boolean;
  public confirmed: boolean;
  public description: string;
  public lineSchedule: boolean;
  public scheduleDuration: number;
  public protocol : string;

  constructor(_key : string,
              _name: string ,
              _nameClean : string,
              _phone: string,
              _scheduleStart: Date,
              _executed: boolean,
              _confirmed: boolean,
              _description : string,
              _lineSchedule: boolean,
              _scheduleDuration: number,
              _protocol : string) {

     this.key = _key;
     this.name = _name;
     this.nameClean = _nameClean;
     this.phone = _phone
     this.scheduleStart = _scheduleStart;
     this.executed = _executed;
     this.confirmed = _confirmed;
     this.description = _description;
     this.lineSchedule = _lineSchedule;
     this.scheduleDuration = _scheduleDuration;
     this.protocol = _protocol;

  }
}
