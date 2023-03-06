import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "../../lib/axios";
import { Importacao } from "../../utils/interfaces";

interface UseFindImportacaoProps {
  id: number;
  filter ?: string;
}

type ResponseUseFindImportacao = {
  registro: Importacao
}

async function getFindImportacao({ id, filter }: UseFindImportacaoProps): Promise<ResponseUseFindImportacao>{
  
  const response: Importacao = await api.get(`/documento/importar/progress/${id}`, {
    params: {
      filter_output: filter
    }
  }).then((res: AxiosResponse) => {
    return res.data.data;
  });

  const registro: Importacao = {
    progress_max: response.progress_max,
    progress_now: response.progress_now,
    created_at: format(new Date(response.created_at), "dd/MM/yyyy H:m:s", { locale: ptBR} ),
    updated_at: format(new Date(response.updated_at), "dd/MM/yyyy H:m:s", { locale: ptBR} ),
    output: response.output,
    input: response.input,
    id: response.id,
    progress_percent: response.progress_percent
  }

  return {
    registro
  }

}

export function useFindImportacao({id, filter}: UseFindImportacaoProps) {
  return useQuery(['importacao-find', {id, filter}], () => getFindImportacao({id, filter}));
}