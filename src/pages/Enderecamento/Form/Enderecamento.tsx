import { 
  Button, 
  Grid, 
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { Input } from "../../../components/Form/Input";
import { TextArea } from "../../../components/Form/TextArea";
import { useMutationEnderecar } from "../../../hooks/Documento/useMutationEnderecar";
import { Documento, ProximoEndereco } from "../../../utils/interfaces";

interface EnderecamenentoProps {
  proximoEndereco: ProximoEndereco;
  documento: Documento;
  setSearch: (search: boolean) => void;
}


export function Enderecamenento({proximoEndereco, setSearch, documento}: EnderecamenentoProps){

  const {reset, register, getValues} = useFormContext();
  const mutationForm = useMutationEnderecar();
  const {
    caixa_id, 
    predio_id, 
    andar_id,
    ultima_caixa, 
    total_documentos_predio, 
    total_caixas_predio,
    espaco_disponivel_predio,
  } = proximoEndereco;

  const handleSalvar = () => {
    mutationForm.mutateAsync({...proximoEndereco, observacao: getValues('observacao')});
    setSearch(false);
    reset();
  };

  return(
    <Box 
      bgColor={"white"}
      borderRadius={"8px"}
      >
      <Grid templateColumns={"repeat(2, 1fr)"} gap={"4"}>
          <Box >
            <Input 
              label="Número da caixa:"
              type="text"
              value={caixa_id}
              name={'caixa_id'}
            />
            <Input 
              label="Número da Prédio:"
              type="text"
              name={'predio_id'}
              value={predio_id}
            />
            <Input 
              label="Andar:"
              type="text"
              name={'andar_id'}
              value={andar_id}
            />
            <TextArea
              placeholder='Informações complementares...'
              size='md'
              resize={'none'}
              label="Observações:"
              {...register('observacao')}
            />
            <Button 
              colorScheme={"green"}
              type="button"
              size={"lg"}
              rightIcon={<HiOutlineCheckCircle size={24}/>}
              variant={"solid"}
              fontSize={"md"}
              paddingLeft={"8"}
              paddingRight={"8"}
              alignItems={"center"}
              loadingText={"Buscando..."}
              width={"100%"}
              mt={"4"}
              onClick={handleSalvar}
            >
            Endereçar
          </Button>
        </Box>

        <Accordion allowMultiple defaultIndex={[0]}> 
            <AccordionItem >
              <h2>
                <AccordionButton bgColor={"green.800"} color={"green.50"} _hover={{bgColor: 'green.900'}}>
                  <Box as="span" flex='1' textAlign='center'>
                    Informação do Dossiê
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} display={"flex"} flexDir={"row"} justifyContent={"space-between"}>
                <Box>
                  <Text fontSize={"lg"} color={"gray.500"}>Cooperado: {documento.nome_cooperado}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>CPF: {documento.cpf_cooperado}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>Tipo: {documento.tipo_documento.descricao}</Text>
                </Box>
                <Box>
                  <Text fontSize={"lg"} color={"gray.500"}>Criado em: {documento.created_at}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>Vencimento: {documento.vencimento_operacao ?? 'Não previsto'}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>Valor: {documento.valor_operacao ?? 'N/C'}</Text>
                </Box>
                <Box>
                </Box>                
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton bgColor={"green.800"} color={"green.50"} _hover={{bgColor: 'green.900'}}>
                  <Box as="span" flex='1' textAlign='center'>
                    Informações do Prédio
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} display={"flex"} flexDir={"row"} justifyContent={"space-between"}>
                <Box>
                  <Text fontSize={"lg"} color={"gray.500"}>Prédio {predio_id}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>Total de documentos: {total_documentos_predio}</Text>
                </Box>
                <Box>
                  <Text fontSize={"lg"} color={"gray.500"}>Quantidade de caixas: {total_caixas_predio}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>Espaço disponível total: {espaco_disponivel_predio}</Text>
                </Box>                
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem >
              <h2>
                <AccordionButton bgColor={"green.800"} color={"green.50"} _hover={{bgColor: 'green.900'}}>
                  <Box as="span" flex='1' textAlign='center'>
                    Informação da última caixa
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} display={"flex"} flexDir={"row"} justifyContent={"space-between"}>
                <Box>
                  <Text fontSize={"lg"} color={"gray.500"}>Caixa {ultima_caixa.id}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>Status:{ultima_caixa.status}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>Espaço ocupado: {ultima_caixa.espaco_ocupado}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>Espaço disponível: {ultima_caixa.espaco_disponivel}</Text>
                </Box>
                <Box>
                  <Text fontSize={"lg"} color={"gray.500"}>Prédio {ultima_caixa.predio_id}</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>{ultima_caixa.andar_id}º Andar</Text>
                  <Text fontSize={"lg"} color={"gray.500"}>Quantidade de Dossiês: {ultima_caixa.documentos_count}</Text>
                </Box>                
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

      </Grid>
  </Box>
  )
}