import { Flex, Text, Icon } from "@chakra-ui/react";
import {BsEmojiFrown} from "react-icons/bs"

export function ListBlank(){
  return(
    <Flex
      justify="center"
      alignItems="center"
      width="100%"
      height="100%"
      direction={"column"}
    >
      <Text
        color={"gray.400"}
        fontSize={"4xl"}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        Ops!!
      </Text>
      <Text
        margin={"2"}
        pb={"5"}
        color={"gray.300"}
      >
        Não encontramos registro aqui...
      </Text>

      <Icon as={BsEmojiFrown} color={"gray.200"} boxSize={"24"}/>

    </Flex>
  );
}