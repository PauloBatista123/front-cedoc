import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { updateFormData } from "../../pages/Enderecos/DialogEdit";
import { Endereco } from "../../utils/interfaces";


export function useMutationEdit(endereco: Endereco) {

  const toast = useToast();
  return useMutation(async (data: updateFormData) => {
    const response = await api.put(`/endereco/${endereco.id}`, {
      andar: endereco.andar,
      rua: endereco.rua, 
      avenida: endereco.avenida,
      unidade_id: endereco.unidade_id,
    });

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['enderecos']);
      toast({
        title: 'Sucesso!',
        description: `Endereco alterado com sucesso!`,
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