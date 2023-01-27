import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { AxiosErrorData } from "../../utils/interfaces";

export function useMutationDelete(){
  const toast = useToast();
  return useMutation(async (enderecoId: string) => {
    const response = await api.delete(`endereco/${enderecoId}`);
    return response;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['enderecos']);
      toast({
        title: 'Sucesso!',
        description: `Registro deletado com sucesso!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    },
    onError: (err: AxiosErrorData) => {
      console.log(err);
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