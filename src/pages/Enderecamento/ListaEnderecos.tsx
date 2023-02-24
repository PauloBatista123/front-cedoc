import { Badge, Box, Button, Divider, Flex, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { BsFolderCheck } from "react-icons/bs";
import { Pagination } from "../../components/Pagination/Index";
import { CaixasResponseProps } from "../../contexts/EnderecamentoContext";
import { useMutationEnderecar } from "../../hooks/Documento/useMutationEnderecar";
import { Caixa, Predio, ProximoEndereco } from "../../utils/interfaces";
import {useFormContext} from "react-hook-form";
import { TextArea } from "../../components/Form/TextArea";
import { ListBlank } from "../../components/ListBlank";

interface ListaEnderecosProps extends ProximoEndereco{
  caixas: CaixasResponseProps;
  onPageChange: (page: number) => void;
  setSearch: (search: boolean) => void;
}

export function ListaEnderecos({caixas, onPageChange, espaco_ocupado_documento, numero_documento, setSearch, predios_disponiveis}: ListaEnderecosProps){

  const mutationForm = useMutationEnderecar();
  const {reset, register, getValues} = useFormContext();

  const handleSalvar = (caixa: Caixa) => {
    mutationForm.mutateAsync({
      caixa_id: caixa.id, 
      andar_id: caixa.andar_id, 
      predio_id: caixa.predio_id, 
      ordem: caixa.proxima_ordem,
      espaco_ocupado_documento, 
      numero_documento,
      observacao: getValues(`observacao_${caixa.id}`)
    });
    setSearch(false);
    reset();
  }

  return(
    <Box>
      <Select placeholder="Filtrar todos" mb={"4"} {...register('predio_id')} size={"lg"}>
        {predios_disponiveis.map((predio: {predio_id: number}) => (
          <option key={predio.predio_id} value={predio.predio_id}>{`Prédio número ${predio.predio_id}`}</option>
        ))}
      </Select>
      
      {caixas.data.length > 0 ? (
        <>
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
              <Text color={"gray.400"} fontSize={"sm"} mr={"2"}>Ordem: {caixa.proxima_ordem}</Text>
              <Text color={"gray.400"} fontSize={"sm"} mr={"2"}>Prédio {caixa.predio.numero ?? 0}</Text>
              <Text color={"gray.400"} fontSize={"sm"} >Andar {caixa.andar_id}</Text>
            </Flex>
          </CardHeader> 
          <CardBody>
            <TextArea
              placeholder="Informe aqui sua observação..."
              {...register(`observacao_${caixa.id}`)}
            />
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
      </>
      ): (
        <ListBlank />
      )}
    </Box>
  );
}