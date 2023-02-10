import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../../lib/axios";
import { Documento, MetaPagination } from "../../utils/interfaces";

interface useDocumentoProps {
  page: number;
  filter ?: {};
}

interface GetDocumentoResponse {
  documentos: Documento[];
  meta: MetaPagination;
}
async function getDocumento({page, filter}: useDocumentoProps): Promise<GetDocumentoResponse> {

  const response = await api.get('documento', {
    params: {
      page, ...filter
    }
  }).then(res => res.data);

  const documentos: Documento[] = response.data.map((documento: Documento) => {
    return {
      id: documento.id,
      documento: documento.documento,
      observacao: documento.observacao,
      caixa: documento.caixa,
      tipo_documento: documento.tipo_documento,
      espaco_ocupado: documento.espaco_ocupado,
      nome_cooperado: documento.nome_cooperado,
      cpf_cooperado: documento.cpf_cooperado,
      data_expurgo: format(new Date(documento.data_expurgo), "d/MM/yyyy H:m", { locale: ptBR} ),
      data_liquidacao: format(new Date(documento.data_liquidacao), "d/MM/yyyy H:m", { locale: ptBR} ),
      status: documento.status,
      created_at: format(new Date(documento.created_at), "d/MM/yyyy H:m", { locale: ptBR} ),
      updated_at: format(new Date(documento.updated_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} ),
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
    documentos,
    meta
  }
}

export function useDocumentos({page, filter}: useDocumentoProps){
  return useQuery(['documentos', {page, filter}], () => getDocumento({page, filter}) );
}