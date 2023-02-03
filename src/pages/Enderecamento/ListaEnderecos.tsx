import { Badge, Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { BsFolderCheck } from "react-icons/bs";
import { Pagination } from "../../components/Pagination/Index";
import { CaixasResponseProps } from "../../contexts/EnderecamentoContext";
import { useMutationEnderecar } from "../../hooks/Documento/useMutationEnderecar";
import { Caixa, ProximoEndereco } from "../../utils/interfaces";
import {useFormContext} from "react-hook-form";

interface ListaEnderecosProps extends ProximoEndereco{
  caixas: CaixasResponseProps,
  onPageChange: (page: number) => void,
  setSearch: (search: boolean) => void;
}

export function ListaEnderecos({caixas, onPageChange, espaco_ocupado_documento, numero_documento, setSearch}: ListaEnderecosProps){

  const mutationForm = useMutationEnderecar();
  const {reset} = useFormContext();

  const handleSalvar = (caixa: Caixa) => {
    mutationForm.mutateAsync({caixa_id: caixa.id, andar_id: caixa.andar_id, predio_id: caixa.predio_id, espaco_ocupado_documento, numero_documento});
    setSearch(false);
    reset();
  }

  return(
    <Box mt={"8"}>
      <SimpleGrid spacing={10} columns={3} >
        {caixas.data?.map(caixa => (
          <Card 
            key={caixa.id}
            border={"1px solid #d1d2dc"}
            boxShadow={"rgba(105, 105, 105, 0.16) 0px 3px 6px, rgba(87, 87, 87, 0.23) 0px 3px 6px;"}
            borderRadius={"6px"}
            bg={"gray.25"}
          >
            <CardHeader>
              <Flex justify={"space-between"} align="center">
                <Text fontWeight={"bold"} fontSize={"2xl"} color={"gray.500"}>Caixa Nº{caixa.numero ?? 0}</Text>
                <Badge borderRadius={"8px"} p="2" colorScheme={"green"}>{caixa.status} {caixa.espaco_disponivel}</Badge>
              </Flex>
              <Flex align={"start"}>
                <Text color={"gray.400"} fontSize={"sm"} mr={"2"}>Prédio {caixa.predio.numero ?? 0}</Text>
                <Text color={"gray.400"} fontSize={"sm"}>Andar {caixa.andar_id}</Text>
              </Flex>
            </CardHeader> 
            <CardBody>
              <Flex direction={"column"} justify={"start"}>
                <Text>Quantidade de Documentos na caixa: {caixa.documentos.length ?? 0}</Text>
              </Flex>
            </CardBody>
            <CardFooter>
            <Button 
              variant='solid' 
              colorScheme='blue' 
              rightIcon={<BsFolderCheck />} 
              width={"100%"}
              onClick={() => handleSalvar(caixa)}
            >
              Arquivar
            </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid >

      <Pagination 
        totalCountofRegisters={caixas.total}
        currentPage={caixas.current_page}
        onPageChange={onPageChange}
        numberToPage={caixas.to}
        lastPage={caixas.last_page}
        numberOfItens={caixas.data?.length}
        registerPerPage={caixas.per_page}
      />
    </Box>
  );
}