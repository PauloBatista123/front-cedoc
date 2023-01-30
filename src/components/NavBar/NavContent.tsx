import { Box, Flex, Text, Icon as ChakraIcon } from "@chakra-ui/react";
import { IconType } from "@react-icons/all-files";
import { ReactNode } from "react";

interface NavContentProps {
  children: ReactNode;
  title: string;
}

export function NavContent({children, title}: NavContentProps){
  return (
    <Box>
        <Text textTransform={"uppercase"} color={"gray.300"} fontSize={"0.8rem"} my={"2"}>{title}</Text>
        <Flex pl={"2"} justify={"flex-start"} direction="column">
          {children}
        </Flex>
    </Box>
  )
}