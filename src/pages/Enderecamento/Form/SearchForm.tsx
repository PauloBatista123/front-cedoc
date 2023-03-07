import { Box, Button, Flex, FormLabel, Grid, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { Input } from "../../../components/Form/Input";
import { newFormDataEnderecamentoSearch } from "../../../utils/schemas";
import { useFormContext, Controller } from "react-hook-form";
import { useTipoDocumentos } from "../../../hooks/TipoDocumental/useTipoDocumento";
import { optionsSelectStyles } from "../../../utils/select-styles";
import Select from "react-select";

interface SearchFormProps {
  handleSearch: (data: newFormDataEnderecamentoSearch) => void;
}

export function SearchForm({handleSearch}: SearchFormProps){
  
  const {register, handleSubmit, formState: {isSubmitting}, control} = useFormContext<newFormDataEnderecamentoSearch>();

  // importar e formatar os tipos para input
  const { data: dataTipos } = useTipoDocumentos({ page: -1, filter: {} });
  const allTipos = dataTipos?.tipos.map((item) => {
    return { value: String(item.id), label: item.descricao }
  });
  // importar e formatar os tipos para input

  const handleSubmitSearch = (data: newFormDataEnderecamentoSearch) => {
    handleSearch(data);
  }

  return (
    <Box
      border={"1px solid #c0c0c065"}
      height="auto"
      borderRadius={"8px"}
      bgColor={"white"}
      p={"6"}
    >
    <SimpleGrid gap={2} columns={5} flexDirection="row" alignItems={"flex-end"} justifyContent={"flex-end"}>
      <Input 
        {...register('numero', {required: true} )}
        type="text"
        placeholder="Número do dossiê"
        label="Número do dossiê"
      />
      <Input 
        {...register('cpf_cooperado', {required: true})}
        type="text"
        placeholder="CPF/CNPJ do titular"
        label="CPF/CNPJ do titular"
      />

     <Controller
        name='tipo_documento_id'
        control={control}
        render={({ field: { onChange, ref, value, name } }) => (
          <Flex flexDir={"column"}>
          <FormLabel mt={"2"} htmlFor={name} >Tipo Documental</FormLabel>
          <Select
            // @ts-ignore
            onChange={(e) => onChange(e?.value)}
            options={allTipos}
            placeholder="Selecione"
            styles={optionsSelectStyles}
            />
          </Flex>
        )}
      />

      <Input 
        {...register('espaco_ocupado', {required: true})}
        type="text"
        placeholder="Espaço ocupado (cm)"
        label="Espaço ocupado (cm)"
      />
      <Button 
        colorScheme={"blue"}
        type="button"
        size={"lg"}
        rightIcon={<HiOutlineDocumentSearch size={24}/>}
        variant={"solid"}
        fontSize={"md"}
        paddingLeft={"8"}
        paddingRight={"8"}
        alignItems={"center"}
        loadingText={"Buscando..."}
        isLoading={isSubmitting}
        onClick={handleSubmit(handleSubmitSearch)}
      >
        Buscar
      </Button>
    </SimpleGrid>
    </Box>
  )
}