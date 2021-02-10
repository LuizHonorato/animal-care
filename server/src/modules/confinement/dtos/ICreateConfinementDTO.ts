export default interface ICreateConfinementDTO {
  nome: string;
  qtdBovinos: number;
  qtdEquinos: number;
  inicioConfinamento: Date;
  fimConfinamento: Date;
  usrCriacao: string;
}
