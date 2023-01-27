import { Box, HStack, Text } from "@chakra-ui/react";
import { Lista } from "./Lista";
import { useForm, FormProvider } from "react-hook-form";
import { SiGooglemaps } from "react-icons/si";

export function Enderecos() {
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
          <SiGooglemaps size={32} />
          <Text fontSize={"2xl"}>
            Endereços
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