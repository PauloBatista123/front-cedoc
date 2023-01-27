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

export interface MetaPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface Endereco {
  id: number;
  rua: string;
  avenida: string;
  andar: string;
  unidade_id: number;
  created_at: string;
  updated_at: string;
  unidade: Unidade;
}

export interface AxiosErrorData {
  response: {
    data: {
      detalhes: string;
    }
  }
}