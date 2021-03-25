import { schedule } from "./schedule.model";

export class patient {
	public id: string;
  phone: string;
  name: string;
  dateFillData: Date;
  maritalStatus: string;
  sons: number;
  dateBorn: Date;
  weight: string;
  phoneContact: string;
  occupation: string;
  motivation: string[];
  mainComplaint: string;
  historyComplaint: string;
  secundaryComplaint: string;
  ingestionLiquid: string;
  liquidTypes: string;
  smoking: string;
  alcohol: string;
  psychoactive: string;
  addiction: string;
  physicalActivity: string;
  physicalActivityFrequency: string;
  qualitySleep: string;
  food: string;
  feces: string;
  lastFeces: string;
  leisureActivities: string;
  leisureRestWork: string;
  disease: string[];
  healthChanges: string[];
  treatments: string[];
  othersTreatments: string;
  medicines: string;
  diu: boolean;
  dum: string;
  subcutaneous: boolean;
  subcutaneousOther: string;
  surgeries: string;
  familyIllnessess: string;


  public schedules: schedule[];
}
