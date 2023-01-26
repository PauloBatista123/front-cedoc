import { Button, Flex, Heading, HStack, IconButton, SimpleGrid, useDisclosure, Icon } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import {BsFunnel, BsPlusCircle} from "react-icons/bs"
import {RiFilterOffFill} from "react-icons/ri"
import { DialogFilter } from "./DialogFilter";
import { ModalForm } from "./ModalForm";

export function ActionList(){

  const { 
    isOpen: isOpenAdd, 
    onClose: onCloseAdd, 
    onOpen: onOpenAdd, 
  } = useDisclosure();

  const { 
    isOpen: isOpenFilter, 
    onClose: onCloseFilter, 
    onOpen: onOpenFilter, 
  } = useDisclosure();

  const {getValues, setValue} = useFormContext();
  const is_filter = getValues("actionFilter");

  const limparFiltro = () => {
    setValue("actionFilter", null);
  }

  return (
    <SimpleGrid
      mb={"6"}
      borderBottom="1px solid #ece7e7a9"
      p={"4"}
    >
      <Flex justify="space-between" align="center">
        <Heading size={"md"} fontWeight="normal" >Lista de unidades...</Heading>
        <Flex align="end">
          <HStack>
          {is_filter && (
            <IconButton aria-label='Limpar' onClick={limparFiltro} as="a" size={"md"} fontSize="sm" colorScheme={"gray"} cursor={"pointer"} mr={"2"} icon={<RiFilterOffFill />}></IconButton>
          )}
            <Button onClick={onOpenFilter} as="a" size={"md"} fontSize="sm" colorScheme={"twitter"} cursor={"pointer"} leftIcon={<Icon as={BsFunnel} onClick={onOpenFilter} fontSize="20"></Icon>}>
              Filtrar
            </Button>
            <Button onClick={onOpenAdd} as="a" size={"md"} fontSize="sm" colorScheme={"blue"} cursor={"pointer"} leftIcon={<Icon as={BsPlusCircle} onClick={onOpenAdd} fontSize="20"></Icon>}>
              Novo
            </Button>
          </HStack>     
            
        </Flex>

      </Flex>
      <ModalForm
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
      />

      <DialogFilter 
        isOpen={isOpenFilter}
        onClose={onCloseFilter}
      />

    </SimpleGrid>
  )
}