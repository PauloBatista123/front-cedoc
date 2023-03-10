import { Box, HStack, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import {GrDocumentVerified} from "react-icons/gr"
import { Lista } from "./Lista";

export function Documentos(){
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
          <BsFillFileEarmarkTextFill size={32} />
          <Text fontSize={"2xl"}>
            Dossiês
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