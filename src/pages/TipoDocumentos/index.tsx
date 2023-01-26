import { Box, HStack, Text } from "@chakra-ui/react";
import { FilePlus } from "phosphor-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTipoDocumentos } from "../../hooks/useTipoDocumento";
import { Lista } from "./Lista";

export function TipoDocumentos(){

  const form = useForm();

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
          <FilePlus weight="fill" size={"32"} color={"#003641"}/>
          <Text
            fontSize={"2xl"}
            
          >
            Tipo Documental
          </Text>
        </HStack>
      </Box>

      <Box
         border={"1px solid #c0c0c065"}
         height="auto"
         borderRadius={"8px"}
         bgColor={"white"}
         p={"6"}
         flexDirection={"row"}
         mt={"4"}
      >
        <FormProvider {...form}>
          <Lista />
        </FormProvider>
      </Box>
    </>
  );
}