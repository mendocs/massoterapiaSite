export class schedule {
	public StartdDate: Date;
  public EndDate: Date;
	public Comments: string;
  public Confirmed: boolean;
  public Executed: boolean;
  public Canceled: boolean;
  public Duration: number;

  constructor(
    ) {

      this.StartdDate = new Date();
      this.Comments = "";
      this.Confirmed = false;
      this.Executed = false;
      this.Canceled = false;
      this.Duration = 50;

      this.EndDate = this.StartdDate;
      this.EndDate.setMinutes(this.Duration);

}





}
