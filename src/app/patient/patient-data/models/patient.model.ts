import { schedule } from "./schedule.model";

export class patient {
	public id: string;
  Phone: string;
  Name: string;
  DateFillData: Date;
  MaritalStatus: string;
  Sons: number;
  DateBorn: Date;
  Weight: string;
  PhoneContact: string;
  Occupation: string;
  Motivation: string[];
  MainComplaint: string;
  HistoryComplaint: string;
  SecundaryComplaint: string;
  IngestionLiquid: string;
  LiquidTypes: string;
  Smoking: string;
  Alcohol: string;
  //Psychoactive: string;
  //Addiction: string;
  PhysicalActivity: string;
  PhysicalActivityFrequency: string;
  QualitySleep: string;
  Food: string;
  Feces: string;
  LastFeces: string;
  LeisureActivities: string;
  //LeisureRestWork: string;
  Disease: string[];
  HealthChanges: string[];
  Treatments: string[];
  OthersTreatments: string;
  Medicines: string;
  Diu: boolean;
  Dum: string;
  Subcutaneous: boolean;
  Prosthesis : boolean;
  //SubcutaneousOther: string;
  Surgeries: string;
  //FamilyIllnessess: string;


  public Schedules: schedule[];
}
