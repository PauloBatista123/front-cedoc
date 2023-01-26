import { Box, HStack, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { MdOutlineStore } from 'react-icons/md'
import { Lista } from "../Unidades/Lista";

export function Unidades(){
  const form = useForm();
  return(
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
            <MdOutlineStore size={32}/>
            <Text
              fontSize={"2xl"}
            >
              Unidades
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