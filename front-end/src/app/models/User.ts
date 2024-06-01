export interface User {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  telefone: string;
  perfilAcess: any;
  contatoPref: number;
  idioma: string;
  status: string;
  dataCriacao: Date;
  ultimoAcesso: Date;
}
