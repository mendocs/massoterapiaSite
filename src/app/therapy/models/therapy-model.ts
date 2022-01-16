export class therapy {
	public id: string;
  public titulo: string;
  public titulo_reduzido: string;
  public duracao: number;
  public preco: number;
	public background: string;
	public resumido: string;
  public detalhado: string;
  public beneficiosTitulo : string;
  public beneficios: string[];
  public outrasInformacoesTitulo : string;
  public outrasInformacoes: string[];



  constructor(_titulo_reduzido: string, _preco : number, _duracao: number) {
    this.titulo_reduzido = _titulo_reduzido;
    this.preco = _preco;
    this.duracao = _duracao;

    this.id = "";
    this.titulo = "";
    this.background = "";
    this.resumido = "";
    this.detalhado = "";
    this.beneficiosTitulo = "";
    this.beneficios = [];
    this.outrasInformacoesTitulo = "";
    this.outrasInformacoes = [];


  }

}
