import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { updateFormData } from "../../pages/Unidades/DialogEdit";
import { Unidade } from "../../utils/interfaces";


export function useMutationEdit(unidade: Unidade) {

  const toast = useToast();
  return useMutation(async (data: updateFormData) => {
    const response = await api.put(`/unidade/${unidade.id}`, {
      nome: data.nome,
      status: data.status,
    });

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['unidades']);
      toast({
        title: 'Sucesso!',
        description: `Unidade alterado com sucesso!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    },
    onError: (err: Error) => {
      toast({
        title: 'Erro!',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    }
  });
}