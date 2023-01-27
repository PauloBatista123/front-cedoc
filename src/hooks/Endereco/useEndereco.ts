import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../../lib/axios";
import { Endereco, MetaPagination } from "../../utils/interfaces";

interface useEnderecoProps {
  page: number;
  filter ?: {};
}

interface GetEnderecoResponse {
  enderecos: Endereco[];
  meta: MetaPagination;
}
async function getEndereco({page, filter}: useEnderecoProps): Promise<GetEnderecoResponse> {

  const response = await api.get('endereco', {
    params: {
      page, ...filter
    }
  }).then(res => res.data);

  const enderecos: Endereco[] = response.data.map((endereco: Endereco) => {
    return {
      id: endereco.id,
      rua: endereco.rua,
      avenida: endereco.avenida,
      andar: endereco.andar,
      unidade_id: endereco.unidade_id,
      unidade: endereco.unidade,
      created_at: format(new Date(endereco.created_at), "d/MM/yyyy H:m", { locale: ptBR} ),
      updated_at: format(new Date(endereco.updated_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} ),
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
    enderecos,
    meta
  }
}

export function useEnderecos({page, filter}: useEnderecoProps){
  return useQuery(['enderecos', {page, filter}], () => getEndereco({page, filter}) );
}