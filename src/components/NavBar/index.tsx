import { Avatar, Box, Flex, Text, WrapItem } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useContext } from "react";
import { NavBarContext } from "../../contexts/NavBarContext";
import { NavContent } from "./NavContent";
import { NavLink } from "./NavLink";
import { SiGooglemaps, SiHomeassistantcommunitystore } from "react-icons/si";
import { BsFillTagsFill } from "react-icons/bs";


export function NavBar(){
  const {onClose, isOpen} = useContext(NavBarContext);

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottom='1px solid #cacaca8b'>
          <Flex justify={"center"} align={"center"} direction={"column"}>
            <WrapItem>
              <Avatar size='md' name='Ryan Florence' src='https://bit.ly/ryan-florence' />{' '}
            </WrapItem>
            <Text color={"gray.500"}>Paulo Henrique</Text>
            <Text color={"gray.100"} fontSize={"sm"}>Assistente</Text>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Box
            margin={"2"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <NavContent title="Cadastros">
              <NavLink text="Endereços" Icon={SiGooglemaps} href={"/enderecos"}/>
              <NavLink text="Tipos Documentais" Icon={BsFillTagsFill} href={"/tipo-documentos"}/>
              <NavLink text="Unidades" Icon={SiHomeassistantcommunitystore} href={"/unidades"}/>
            </NavContent>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}