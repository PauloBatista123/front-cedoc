import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { Unidade } from "../../utils/interfaces";

interface useUnidadeProps {
  page: number;
  filter: {} | undefined;
}

interface GetUnidadeResponse {
  unidades: Unidade[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  }
}

async function getUnidades({page, filter}: useUnidadeProps): Promise<GetUnidadeResponse> {
  
  const response = await api.get('unidade', {
    params: {
      page, ...filter
    }
  }).then(response => response.data);

  const unidades: Unidade[] = response.data.map((item: Unidade) => {
    return {
      id: item.id,
      nome: item.nome,
      status: item.status,
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
    unidades,
    meta
  }
}

export function useUnidades({page, filter}: useUnidadeProps){
  return useQuery(["unidades", {page, filter} ], () =>  getUnidades({page , filter}));
}