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
      detalhes?: string;
      error?: string;
    }
  }
}

interface Predio {
  id: number;
  numero: string;
  observacao: string;
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}

export interface Caixa {
  id: number;
  status: 'disponivel' | 'ocupado',
  numero: string;
  espaco_total: string;
  espaco_ocupado: string;
  espaco_disponivel: string;
  predio_id: number;
  andar_id: number;
  created_at: string;
  updated_at: string;
  predio: Predio;
  documentos: Documento[];
}

export interface Documento {
  id: number;
  documento: number;
  observacao: string;
  tipo_documento: TipoDocumento;
  caixa: Caixa;
  espaco_ocupado: string;
  status: 'aguardando' | 'emprestimo' | 'arquivado';
  created_at: string;
  updated_at: string;

}

export interface ProximoEndereco {
  caixa_id: number;
  predio_id: number;
  andar_id: number;
  ultima_caixa: Caixa;
  espaco_disponivel_predio: string;
  total_documentos_predio: number;
  total_caixas_predio: number;
  espaco_ocupado_documento: string;
  numero_documento: number;
}

export interface useMutationEnderecarProps {
  espaco_ocupado_documento: string;
  numero_documento: number;
  caixa_id: number;
  predio_id: number;
  andar_id: number;
}
