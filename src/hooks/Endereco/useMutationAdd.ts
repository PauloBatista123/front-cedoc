import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { newFormData } from "../../pages/Enderecos/ModalForm";

interface AxiosErrorResponse {
  response: {
    data: {
      msg: string;
    }
  }
}

export function useMutationAdd(){
  const toast = useToast();
  return useMutation(async (endereco: newFormData) => {
    const response = await api.post('endereco', {
      ...endereco
  });

    return response.data;
  }, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['enderecos']);
      toast({title: 'Endereço criado com sucesso!', description: `${response.msg}`, status: 'success', duration: 5000, isClosable: true, position: "top-right"});
    },
    onError: (err: AxiosErrorResponse) => {
      toast({title: 'Erro na criação!', description: `${err.response?.data.msg}`, status: 'warning', duration: 5000, isClosable: true, position: "top-right"});
    }
  });
}