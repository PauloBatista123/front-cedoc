import { Badge, Box, Card, CardBody, CardHeader, Flex, Progress, ProgressLabel, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { queryClient } from "../../../lib/reactQuery";
import { ImportacaoItemProps } from "./Success";

export function ItemProgress({registro, handleDetalhes}: ImportacaoItemProps) {

  const [progress, setProgress] = useState();
  
  const loadProgress = async () => {
    const res = await api.get(`/documento/importar/now/${registro.id}`).then((response) => response.data);
    return res.progress_now;
  }

  useEffect(() => {
    const intervalo = setInterval(async () => {
      const progress = await loadProgress();
      
      if(Number(progress) < 100){
        console.log(Number(progress));
        setProgress(progress);
      }else{
        console.log("invalidate");
        queryClient.invalidateQueries(['importacao']);
        clearInterval(intervalo)
      }

    }, 5000);

    return () => clearInterval(intervalo)
  }, [progress])

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
                <Progress rounded={"base"} isAnimated colorScheme={'red'} height={"24px"} value={registro.progress_percent}>
                  <ProgressLabel fontSize={"sm"}>Importação completa</ProgressLabel>
                </Progress>
              ): (
                <Progress rounded={"base"} isAnimated colorScheme={'red'} height={"24px"} value={progress}>
                  <ProgressLabel fontSize={"sm"}>{progress}%</ProgressLabel>
                </Progress>
              )}
             
            </CardBody>
          </Card>
  )
}