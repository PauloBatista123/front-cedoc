export interface TipoDocumento {
  id: number;
  descricao: string;
  temporalidade: number;
  created_at: string;
  updated_at: string;
}

export interface Unidade {
  id: number;
  nome: string;
  created_at: string;
  updated_at: string;
  status: 'ativo' | 'inativo';
}