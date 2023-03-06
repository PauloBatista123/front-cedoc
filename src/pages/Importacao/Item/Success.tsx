import { Badge, Box, Card, CardBody, CardHeader, Flex, Progress, ProgressLabel, Text } from "@chakra-ui/react";
import { Importacao } from "../../../utils/interfaces";

export interface ImportacaoItemProps {
  registro: Importacao;
  handleDetalhes: (registro: Importacao) => void;
}

export function ItemSucess({registro, handleDetalhes}: ImportacaoItemProps) {

  return (
    <Card _hover={{backgroundColor: 'gray.25'}} key={registro.id} onClick={() => handleDetalhes(registro)}>
            <CardHeader borderBottom={"1px solid #dedede7d"}>
              <Flex justify={"space-between"}>
              <Box>
                <Text fontWeight={"bold"} fontSize={"2xl"} color={"gray.800"}># {registro.id}</Text>
              </Box>          
              </Flex>
            </CardHeader>
            <CardBody>
            <Flex justify={"space-between"} mb={"4"}>
                <Box>
                  <Text fontWeight={"bold"} fontSize={"lg"}>Número de Registros: {registro.progress_max}</Text>
                  <Text fontSize={"sm"}>Registros processados: {registro.progress_now}</Text>
                </Box>
                <Box>
                  <Badge
                    fontSize={"sm"}
                    rounded={"md"}
                    variant={"outline"}
                    colorScheme={registro.input.status === 'finished'? 'green' : 'red'}
                    color={registro.input.status === 'finished'? 'green.400' : 'red.400'}>
                      {registro.input.status}
                  </Badge>
                </Box>
              </Flex>
              {registro.input.status === 'finished' ? (
                <Progress rounded={"base"} isAnimated colorScheme={'green'} height={"24px"} value={registro.progress_percent}>
                  <ProgressLabel fontSize={"sm"}>Importação completa</ProgressLabel>
                </Progress>
              ): (
                <Progress rounded={"base"} isAnimated colorScheme={'red'} height={"24px"} value={100}>
                  <ProgressLabel fontSize={"sm"}>Erro no processamento</ProgressLabel>
                </Progress>
              )}
             
            </CardBody>
          </Card>
  )
}