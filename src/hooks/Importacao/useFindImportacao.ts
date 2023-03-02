import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { api } from "../../lib/axios";
import { Importacao } from "../../utils/interfaces";

interface UseFindImportacaoProps {
  id: number;
}

type ResponseUseFindImportacao = {
  registro: Importacao
}

async function getFindImportacao({ id }: UseFindImportacaoProps): Promise<ResponseUseFindImportacao>{
  
  const registro: Importacao = await api.get(`/documento/importar/progress/${id}`).then((res: AxiosResponse) => {
    return res.data.data;
  });
  return {
    registro
  }

}

export function useFindImportacao({id}: UseFindImportacaoProps) {
  return useQuery(['importacao-find', {id}], () => getFindImportacao({id}));
}