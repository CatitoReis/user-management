export interface User {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  telefone: string;
  perfilAcess: string;
  contatoPref: number;
  idioma: string;
  status: string;
  dataCriacao: Date;
  ultimoAcesso: Date;
}
export interface BandeiraTelefone{
  name: string;
  code: string;
  flagImagePath: string;
}
