import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { updateFormData } from "../../pages/TipoDocumentos/DialogEdit";
import { TipoDocumento } from "../../utils/interfaces";


export function useMutationEdit(tipoDocumento: TipoDocumento) {

  const toast = useToast();
  return useMutation(async (data: updateFormData) => {
    const response = await api.put(`/tipo-documento/${tipoDocumento.id}`, {
      descricao: data.descricao,
      temporalidade: data.temporalidade,
    });

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tipo-documentos']);
      toast({
        title: 'Sucesso!',
        description: `Tipo documental deletado com sucesso!`,
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