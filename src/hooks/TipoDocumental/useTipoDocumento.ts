import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {useQuery} from '@tanstack/react-query'
import { api } from '../../lib/axios';
import { MetaPagination } from '../../utils/interfaces';

interface TipoDocumento {
  id: number;
  descricao: string;
  temporalidade: number;
  created_at: string;
  updated_at: string;
}

interface GetTipoDocumentoResponse {
  tipos: TipoDocumento[];
  meta: MetaPagination;
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

    let meta;

    if(Object.keys(response).some(key => key == 'meta')){
      meta = {
        current_page: response.meta.current_page,
        last_page: response.meta.last_page,
        per_page: response.meta.per_page,
        to: response.meta.to,
        total: response.meta.total,
      }
    }else{
      meta = {
        current_page: 1,
        last_page: 1,
        per_page: 1,
        to: 1,
        total: 1
      }
    }

  return {
    tipos,
    meta
  }
}

export function useTipoDocumentos({page, filter}: UseTipoDocumentosProps) {
  return useQuery(['tipo-documentos', {page, filter}], () => getTipoDocumentos({page, filter}), {
    refetchOnWindowFocus: false,
  } );
}