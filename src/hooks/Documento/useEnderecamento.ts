import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { Caixa, Documento, MetaPagination } from "../../utils/interfaces";

interface useDocumentoProps {
  page: number;
  filter ?: {};
}

interface GetDocumentoResponse {
  documento: Documento;
  caixas: {
    data: Caixa[],
    current_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
async function getDocumento({page, filter}: useDocumentoProps): Promise<GetDocumentoResponse> {

  const response = await api.get('espaco-disponivel', {
    params: {
      page, ...filter
    }
  });

  const documento: Documento = response.data.documento;

  const caixas = response.data.caixas

  return {
    documento,
    caixas
  }
}

export function useEnderecamento({page, filter}: useDocumentoProps){
  return useQuery(['espaco-disponivel', {page, filter}], () => getDocumento({page, filter}) );
}