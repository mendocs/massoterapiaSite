import { schedule } from "./schedule.model";

export class patientForm {
	public name: string;
	public phone: string;
  public scheduledateRange : Date[];
  //public scheduledate : Date;
  //public scheduletime : Date;
  //public duration : number;
  public scheduleData : schedule;
}
