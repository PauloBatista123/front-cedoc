import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { api } from "../../lib/axios";
import { Documento, Caixa } from "../../utils/interfaces";

interface UseFindDocumentoProps {
  id: number;
}

type ResponseUseFindDocumento = {
  documento: Documento
}

async function getFindDocumento({ id }: UseFindDocumentoProps): Promise<ResponseUseFindDocumento>{
  
  const documento: Documento = await api.get(`/documento/${id}`).then((res: AxiosResponse) => {
    return res.data.data;
  });
  return {
    documento
  }

}

export function useFindDocumento({id}: UseFindDocumentoProps) {
  return useQuery(['documento-find', {id}], () => getFindDocumento({id}));
}