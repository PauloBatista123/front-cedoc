import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { useMutationEnderecarProps } from "../../utils/interfaces";

interface AxiosErrorResponse {
  response: {
    data: {
      msg: string;
    }
  }
}

export function useMutationEnderecar(){
  const toast = useToast();
  return useMutation(async (endereco: useMutationEnderecarProps) => {
    const response = await api.post('documento/enderecar', {
      numero: endereco?.numero_documento, 
      espaco_ocupado: endereco?.espaco_ocupado_documento, 
      numero_caixa: endereco?.caixa_id, 
      predio_id: endereco?.predio_id, 
      andar_id: endereco?.andar_id,
      observacao: endereco?.observacao
  });

    return response.data;
  }, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['espaco-disponivel'], {
        refetchType: 'active'
      });

      toast({title: 'Documento registrado com sucesso!', description: `${response.msg}`, status: 'success', duration: 5000, isClosable: true, position: "top-right"});
    },
    onError: (err: AxiosErrorResponse) => {
      toast({title: 'Erro no endereçamento!', description: `${err.response?.data.msg}`, status: 'warning', duration: 5000, isClosable: true, position: "top-right"});
    }
  });
}