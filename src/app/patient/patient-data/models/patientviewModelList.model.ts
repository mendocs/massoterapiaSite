import { schedule } from "./schedule.model";

export class patientList {
	public key: string;
	public name: string;
	public phone: string;
  public schedules: schedule[];
}
