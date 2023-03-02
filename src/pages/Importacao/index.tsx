import { Box, HStack, Text } from "@chakra-ui/react";
import {TbDatabaseImport} from 'react-icons/tb';
import { Lista } from "./Lista";

export function Importacao(){
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
          <TbDatabaseImport size={32} />
          <Text fontSize={"2xl"}>
            Importação de dossiês
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
          <Lista />
      </Box>
    </>
  );
}