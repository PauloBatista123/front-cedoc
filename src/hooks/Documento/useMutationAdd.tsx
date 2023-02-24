import { Box, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { RiErrorWarningFill } from "react-icons/ri";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/reactQuery";
import { newFormDataNovoDocumento } from "../../utils/schemas";

interface AxiosErrorResponse {
  response: {
    data: {
      msg: string;
      errors: {
        documento?: string[],
        nome?: string[],
        cpf?: string[],
        tipo_documento_id?: string[]
      }
    }
  }
}

export function useMutationAdd(){
  const toast = useToast();
  return useMutation(async (documento: newFormDataNovoDocumento) => {
    const response = await api.post('documento', {
      ...documento
  });

    return response.data;
  }, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['documentos']);
      toast({title: 'Dossiê criado com sucesso!', description: `${response.msg}`, status: 'success', duration: 5000, isClosable: true, position: "top-right"});
    },
    onError: (err: AxiosErrorResponse) => {
      toast({
        title: 'Erro na validação dos campos!', 
        status: 'warning', 
        duration: 5000, 
        isClosable: true,
        position: "top-right",
        render: () => (
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            gap={2}
            color='white'
            p={3}
            bg='orange.500'
            rounded={"md"}
            boxShadow={"base"}
            >
            <Box><RiErrorWarningFill fontSize={"24px"}/></Box>
            <Box >
              <Text fontWeight={"bold"}>Erro na validação dos campos!</Text>
              <Text>{err.response.data.errors?.documento?.toString()}</Text>
              <Text>{err.response.data.errors?.nome?.toString()}</Text>
              <Text>{err.response.data.errors?.tipo_documento_id?.toString()}</Text>
            </Box>
          </Box>
          
        )
      });
    }
  });
}