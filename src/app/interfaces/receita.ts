

export interface Receita {
  id: number;
  titulo: string;
  descricao: string;
}


interface UsuarioDTO {
  id: number;
  nome: string;
}

interface IngredienteDTO {
  nomeIngrediente: string;
  quantidade: string;
  unidade: string;
}


export interface ReceitaDetalhe {
  id: number;
  titulo: string;
  descricao: string;
  modoPreparo: string;
  categoria: string;
  dieta: string;
  dataCriacao: string; // O Angular pode converter a string de data
  usuario: UsuarioDTO;
  ingredientes: IngredienteDTO[];
  mediaAvaliacoes: number | null;
}

export interface Comentario {
  id: number;
  texto: string;
  dataCriacao: string;
  usuario: { 
    id: number;
    nome: string;
  };
}