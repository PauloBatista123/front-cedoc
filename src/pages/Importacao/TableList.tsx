import { Badge, Box, Card, CardBody, CardFooter, CardHeader, Flex, SimpleGrid, Text, Progress, ProgressLabel } from "@chakra-ui/react";
import { useCallback } from "react";
import { Pagination } from "../../components/Pagination/Index";
import { MetaPagination, Importacao } from "../../utils/interfaces";


interface TableListProps {
  registros: Importacao[] | undefined;
  meta: MetaPagination | undefined;
  onPageChange?: (page: number) => void;
  onOpenDetalhes: () => void;
  setImportDetalhes: (registro: Importacao) => void;
}

export function TableList({registros, meta, onPageChange, onOpenDetalhes, setImportDetalhes}: TableListProps) {

  const handleDetalhes = useCallback((registro: Importacao) => {
    setImportDetalhes(registro);
    onOpenDetalhes();
  }, []);

  return (
    <>
    <SimpleGrid columns={{md: 2, lg: 3}} gap={"3"}>
    {registros?.map((registro) => (
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
              <Progress variant={""} isAnimated colorScheme={registro.input.status === 'finished'? 'green' : 'red'} size='lg' value={registro.progress_percent}>
                <ProgressLabel>{registro.progress_percent}%</ProgressLabel>
              </Progress>
            </CardBody>
          </Card>
        ))}
    </SimpleGrid>
    

    <Pagination 
      totalCountofRegisters={meta?.total}
      currentPage={meta?.current_page}
      onPageChange={onPageChange}
      numberToPage={meta?.to}
      lastPage={meta?.last_page}
      numberOfItens={registros?.length}
      registerPerPage={meta?.per_page}
    />
  </>
  )
}