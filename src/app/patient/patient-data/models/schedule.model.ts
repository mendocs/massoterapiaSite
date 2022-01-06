export class schedule {
	public StartdDate: Date;
  public EndDate: Date;
	public Comments: string;
  public Confirmed: boolean;
  public Executed: boolean;
  public Canceled: boolean;
  public Duration: number;
  public Protocol: string;
  public Price: number;
  public Package: string;
  public PackageSession: number;


  constructor(
    ) {

      this.StartdDate = new Date();
      this.Comments = "";
      this.Confirmed = false;
      this.Executed = false;
      this.Canceled = false;
      this.Duration = 50;
      this.Protocol = "";
      this.Price = 0;
      this.Package = "";
      this.PackageSession = 0;

      this.EndDate = new Date(this.StartdDate.getTime() + (this.Duration * 60 * 1000));

}





}
