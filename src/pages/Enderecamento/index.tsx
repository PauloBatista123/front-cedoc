import { Box, HStack, Text } from "@chakra-ui/react";
import { GrDocumentConfig } from "react-icons/gr";
import { Formulario } from "./Formulario";
import { useForm, FormProvider } from "react-hook-form";
import { validationSchemaEnderecamento } from "../../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export function Enderecamento(){
  const methods = useForm({
    resolver: zodResolver(validationSchemaEnderecamento),
    defaultValues: { numero: '', espaco_ocupado: ''}
  })

  return (
    <>
      <Box
        border={"1px solid #c0c0c065"}
        height="auto"
        borderRadius={"8px"}
        bgColor={"white"}
        p={"6"}
        flexDirection={"row"}
      >
        <HStack>
          <GrDocumentConfig size={32} />
          <Text fontSize={"2xl"}>
            Endereçamento
          </Text>
        </HStack>
      </Box>

      <Box
        height="auto"
        flexDirection={"row"}
        mt={"4"}
      >
        <FormProvider {...methods}>
          <Formulario />
        </FormProvider>
      </Box>
    </>
  )
}