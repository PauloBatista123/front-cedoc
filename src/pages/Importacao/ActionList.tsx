import { Button, Flex, Heading, HStack, IconButton, SimpleGrid, useDisclosure, Icon } from "@chakra-ui/react";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import {BsFunnel, BsPlusCircle} from "react-icons/bs"
import {RiFilterOffFill} from "react-icons/ri"
import { DialogAdd } from "./DialogAdd";

export function ActionList(){

  const { 
    isOpen: isOpenAdd, 
    onClose: onCloseAdd, 
    onOpen: onOpenAdd, 
  } = useDisclosure();

  return (
    <SimpleGrid
      mb={"6"}
      borderBottom="1px solid #ece7e7a9"
      p={"4"}
    >
      <Flex justify="space-between" align="center">
        <Heading size={"md"} fontWeight="normal" >Lista de importações...</Heading>
        <Flex align="end">
          <HStack>
            <Button onClick={onOpenAdd} as="a" size={"md"} fontSize="sm" colorScheme={"blue"} cursor={"pointer"} leftIcon={<Icon as={BsPlusCircle} onClick={onOpenAdd} fontSize="20"></Icon>}>
              Novo
            </Button>
          </HStack>     
        </Flex>

      </Flex>

      <DialogAdd 
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
      />

      

    </SimpleGrid>
  )
}