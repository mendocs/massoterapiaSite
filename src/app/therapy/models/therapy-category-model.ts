import { therapy } from "./therapy-model";
import { pack } from "./pack-model";

export class therapyCategory {
	public categoria: string;
  public image: string;
  public cor: string;
  public image_background : string;
  public protocolos: therapy[];
  public pacotes: pack[];
}
