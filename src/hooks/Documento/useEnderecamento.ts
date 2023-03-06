import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Axios, AxiosError } from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "../../lib/axios";
import { AxiosErrorData, AxiosErrorResponse, Caixa, Documento, ProximoEndereco } from "../../utils/interfaces";

interface useDocumentoProps {
  page: number;
  filter ?: {};
}

interface GetDocumentoResponse {
  proximoEndereco: ProximoEndereco;
  caixas: {
    data: Caixa[],
    current_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  documento: Documento
}
async function getDocumento({page, filter}: useDocumentoProps): Promise<GetDocumentoResponse> {

  const response = await api.get('documento/espaco-disponivel', {
    params: {
      page, ...filter
    }
  }).then((response) => response.data);

  const documento: Documento = {
    ...response.documento,
    created_at: format(new Date(response.documento.created_at), "dd/MM/yyyy", { locale: ptBR} ),
  };

  const proximoEndereco: ProximoEndereco = {
    caixa_id: response.proximo_endereco.caixa_id,
    predio_id: response.proximo_endereco.predio_id,
    andar_id: response.proximo_endereco.andar_id,
    ultima_caixa: response.ultima_caixa,
    espaco_disponivel_predio: response.predio.espaco_disponivel_total,
    total_documentos_predio: response.predio.total_documentos,
    total_caixas_predio: response.predio.total_caixas,
    espaco_ocupado_documento: response.espaco_ocupado,
    numero_documento: response.documento.documento,
    predios_disponiveis: response.predios_disponiveis,
    ordem: response.proximo_endereco.ordem,
  };

  const caixas = response.caixas;

  return {
    proximoEndereco,
    caixas,
    documento
  }
}

export function useEnderecamento({page, filter}: useDocumentoProps){  
  const toast = useToast();
  return useQuery<GetDocumentoResponse | null, AxiosError<{error: string}>>(['espaco-disponivel', {page, filter}], () => filter ? getDocumento({page, filter}): null, {
    retry: false,
    refetchOnWindowFocus: false,
  });
}