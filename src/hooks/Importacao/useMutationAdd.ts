import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { newFormDataImportarDossies } from "../../utils/schemas";

interface AxiosErrorResponse {
  response: {
    data: {
      detalhes: string;
    }
  }
}

export function useMutationAdd(){
  const toast = useToast();
  return useMutation(async (data: newFormDataImportarDossies) => {

    let bodyform = new FormData();
    bodyform.append("arquivo", data.arquivo[0]);

    const response = await api.post('documento/importar/novos', bodyform, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data;
  }, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['importacao']);
      toast({title: 'Arquivo enviado com sucesso!', description: `${response.msg}`, status: 'success', duration: 5000, isClosable: true, position: "top-right"});
    },
    onError: (err: AxiosErrorResponse) => {
      toast({title: 'Erro na criação!', description: `${err.response?.data.detalhes}`, status: 'warning', duration: 5000, isClosable: true, position: "top-right"});
    }
  });
}