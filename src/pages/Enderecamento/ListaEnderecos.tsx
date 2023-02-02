import { Badge, Box, Button, Divider, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Caixa } from "../../utils/interfaces";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Fragment } from "react";

interface ListaEnderecosProps {
  caixas ?: Caixa[]
}

export function ListaEnderecos({caixas}: ListaEnderecosProps){
  return(
    <Box mt={"8"}>
      <Text fontSize={"lg"} color={"gray.600"} fontWeight="bold">Caixas localizadas com espaço disponível: </Text>
      <SimpleGrid spacing={10} columns={3}  borderTop={"1px solid #d1d2dc"} pt={"8"}>
        {caixas?.map(caixa => (
          <Card 
            key={caixa.id}
            border={"1px solid #d1d2dc"}
            boxShadow={"rgba(105, 105, 105, 0.16) 0px 3px 6px, rgba(87, 87, 87, 0.23) 0px 3px 6px;"}
            borderRadius={"6px"}
            bg={"gray.25"}
          >
            <CardHeader>
              <Flex justify={"space-between"} align="center">
                <Text fontWeight={"bold"} fontSize={"2xl"} color={"gray.500"}>Caixa Nº{caixa.numero}</Text>
                <Badge borderRadius={"8px"} p="2" colorScheme={"green"}>{caixa.status} {caixa.espaco_disponivel}</Badge>
              </Flex>
              <Flex align={"start"}>
                <Text color={"gray.400"} fontSize={"sm"} mr={"2"}>Prédio {caixa.predio.numero}</Text>
                <Text color={"gray.400"} fontSize={"sm"}>Andar {caixa.andar_id}</Text>
              </Flex>
            </CardHeader> 
            <CardBody>
              <Flex direction={"column"} justify={"start"}>
                <Text>Quantidade de Documentos na caixa: {caixa.documentos.length ?? 0}</Text>
              </Flex>
            </CardBody>
            <CardFooter>
            <Button variant='solid' colorScheme='blue'>
              Arquivar
            </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid >
    </Box>
  );
}