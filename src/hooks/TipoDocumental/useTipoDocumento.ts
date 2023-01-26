import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {useQuery} from '@tanstack/react-query'
import { api } from '../../lib/axios';

interface TipoDocumento {
  id: number;
  descricao: string;
  temporalidade: number;
  created_at: string;
  updated_at: string;
}

interface GetTipoDocumentoResponse {
  tipos: TipoDocumento[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  }
}

interface UseTipoDocumentosProps {
  page: number;
  filter: {} | null;
}

async function getTipoDocumentos({page, filter}: UseTipoDocumentosProps): Promise<GetTipoDocumentoResponse> {
  
  const response = await api.get('tipo-documento', {
    params: { page, ...filter } 
  }).then((response) => {
    return response.data;
  });

  const tipos: TipoDocumento[] = response.data.map((item: TipoDocumento) => {
    return {
      id: item.id,
      descricao: item.descricao,
      temporalidade: item.temporalidade,
      created_at: format(new Date(item.created_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} ),
      updated_at: format(new Date(item.updated_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} )
    }
  });

  const meta = {
    current_page: response.meta.current_page,
    last_page: response.meta.last_page,
    per_page: response.meta.per_page,
    to: response.meta.to,
    total: response.meta.total,
  }

  return {
    tipos,
    meta
  }
}

export function useTipoDocumentos({page, filter}: UseTipoDocumentosProps) {
  return useQuery(['tipo-documentos', {page, filter}], () => getTipoDocumentos({page, filter}) );
}