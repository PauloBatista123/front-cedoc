import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "../../lib/axios";
import { Importacao, MetaPagination } from "../../utils/interfaces";

interface useImportacaoProps {
  page: number;
  filter ?: {};
}
interface useImportacaoResponse {
  registros: Importacao[];
  meta: MetaPagination;
}

async function getImportacoes({ page, filter }: useImportacaoProps): Promise<useImportacaoResponse> {

  const response = await api.get("/documento/importar/progress", {
    params: {
      page, ...filter
    }
  }).then((response) => response.data);

  const registros: Importacao[] = response.data.map((item: Importacao) => {
    return {
      id: item.id,
      input: item.input,
      progress_now: item.progress_now,
      progress_max: item.progress_max,
      progress_percent: item.progress_percent,
      created_at: format(new Date(item.created_at), "d/MM/yyyy H:m", { locale: ptBR} ),
      updated_at: format(new Date(item.updated_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} ),
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
    registros,
    meta
  }
}

export function useImportacao({page, filter}: useImportacaoProps){
  return useQuery(['importacao', {page, filter}], () => getImportacoes({page, filter}));

}