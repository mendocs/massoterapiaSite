export class pack {
	public id: string;
  public titulo: string;
  public titulo_reduzido: string;
  public sessoes: number;
  public preco: number;
  public desconto: number;
  public descricao: string;
  public protocolos: string[];

  constructor(_titulo: string, _preco: number) {
    this.id = "";
    this.titulo = _titulo;
    this.titulo_reduzido = "";
    this.sessoes = 1;
    this.preco = _preco;
    this.desconto = 0;
    this.descricao = "";
    this.protocolos = [];

  }

}
