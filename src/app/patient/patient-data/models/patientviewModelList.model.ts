import { schedule } from "./schedule.model";

export class patientList {
	public id: string;
	public name: string;
	public phone: string;
  public schedules: schedule[];
}
