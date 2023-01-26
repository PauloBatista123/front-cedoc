import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { newFormData } from "../../pages/TipoDocumentos/ModalForm";

interface AxiosErrorResponse {
  response: {
    data: {
      msg: string;
    }
  }
}

export function useMutationAdd(){
  const toast = useToast();
  return useMutation(async (tipo: newFormData) => {
    const response = await api.post('tipo-documento', {
      ...tipo
  });

    return response.data;
  }, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['tipo-documentos']);
      toast({title: 'Tipo documental criado com sucesso!', description: `${response.msg}`, status: 'success', duration: 5000, isClosable: true, position: "top-right"});
    },
    onError: (err: AxiosErrorResponse) => {
      toast({title: 'Erro na criação!', description: `${err.response?.data.msg}`, status: 'warning', duration: 5000, isClosable: true, position: "top-right"});
    }
  });
}