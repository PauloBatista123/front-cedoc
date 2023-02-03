import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { Input } from "../../../components/Form/Input";
import { useMutationEnderecar } from "../../../hooks/Documento/useMutationEnderecar";
import { ProximoEndereco } from "../../../utils/interfaces";

interface EnderecamenentoProps {
  proximoEndereco: ProximoEndereco;
  setSearch: (search: boolean) => void;
}


export function Enderecamenento({proximoEndereco, setSearch}: EnderecamenentoProps){

  const {reset} = useFormContext();
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
    mutationForm.mutateAsync(proximoEndereco);
    setSearch(false);
    reset();
  };

  return(
    <Box 
      mt={"4"} 
      bgColor={"white"}
      p={"6"}
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

        <Box flexDir={"column"}>
          <Text fontWeight={"bold"}>Informações da última caixa:</Text>
          <Text>Número: {ultima_caixa?.id}</Text>
          <Text>Espaço ocupado: {ultima_caixa?.espaco_ocupado}</Text>
          <Text>Espaço disponível: {ultima_caixa?.espaco_disponivel}</Text>
          <Text fontWeight={"bold"} mt={"2"}>Informações do prédio:</Text>
          <Text>Espaço disponível: {espaco_disponivel_predio}</Text>
          <Text>Total de documentos: {total_documentos_predio}</Text>
          <Text>Total de caixas: {total_caixas_predio}</Text>
        </Box>

      </Grid>
  </Box>
  )
}