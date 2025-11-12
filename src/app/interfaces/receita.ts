import { SafeStyle } from '@angular/platform-browser';

export interface Receita {
  id: number;
  titulo: string;
  descricao: string;
  imagemUrl?: string;
  safeImagemUrl?: SafeStyle;
}

interface UsuarioDTO {
  id: number;
  nome: string;
}

interface IngredienteDTO {
  ingredienteId: number;
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
  dataCriacao: string; 
  usuario: UsuarioDTO;
  ingredientes: IngredienteDTO[];
  mediaAvaliacoes: number | null;
  informacaoNutricional: InformacaoNutricional | null;
  imagemUrl?: string;
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

export interface InformacaoNutricional {
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  fibra: number;
  acucar: number;
  sodio: number;
  gorduraSaturada: number;
}