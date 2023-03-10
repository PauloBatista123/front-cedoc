import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { AxiosErrorData } from "../../utils/interfaces";


export function useMutationDelete(){
  const toast = useToast();
  return useMutation(async (tipoId: string) => {
    const response = await api.delete(`unidade/${tipoId}`);
    return response;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['unidades']);
      toast({
        title: 'Sucesso!',
        description: `Registro deletadocom sucesso!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    },
    onError: (err: AxiosErrorData) => {
      toast({
        title: 'Erro!',
        description: err.response?.data.detalhes,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    }
  })
}