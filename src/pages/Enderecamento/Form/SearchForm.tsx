import { Box, Button, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { Input } from "../../../components/Form/Input";
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchemaEnderecamento } from "../../../utils/schemas";

const formValidationSchema = validationSchemaEnderecamento;

export type newFormData = zod.infer<typeof formValidationSchema>;

interface SearchFormProps {
  handleSearch: (data: newFormData) => void;
}

export function SearchForm({handleSearch}: SearchFormProps){
  
  const {register, handleSubmit, formState: {isSubmitting}} = useForm({
    resolver: zodResolver(formValidationSchema),
    defaultValues: { numero: '', espaco_ocupado: ''}
  });

  const handleSubmitSearch = (data: newFormData) => {
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
    <Flex gap={2} align={"flex-end"}>
      <Input 
        {...register('numero', {required: true} )}
        type="text"
        placeholder="Informe o número do documento"
        label="Número do documento"
      />
      <Input 
        {...register('espaco_ocupado', {required: true})}
        type="text"
        placeholder="Informe o espaço ocupado pelo documento (cm)"
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
    </Flex>
    </Box>
  )
}