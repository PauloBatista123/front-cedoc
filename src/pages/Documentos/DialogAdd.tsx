import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormErrorMessage, FormLabel, InputGroup, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FloppyDisk } from "phosphor-react";
import { ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Input } from "../../components/Form/Input";
import { useMutationAdd } from "../../hooks/Documento/useMutationAdd";
import { useTipoDocumentos } from "../../hooks/TipoDocumental/useTipoDocumento";
import { apiUbots } from "../../lib/axios";
import { AxiosErrorData } from "../../utils/interfaces";
import { newFormDataNovoDocumento, validationSchemaNovoDocumento } from "../../utils/schemas";
import { optionsSelectStyles } from "../../utils/select-styles";

interface DialogAddProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CooperadoResponse {
  nome: string;
  error?: boolean;
  message: string;
}

export function DialogAdd({isOpen, onClose}: DialogAddProps){

  const {register, formState: {isSubmitting, errors}, handleSubmit, setValue, control, setError, clearErrors} = useForm<newFormDataNovoDocumento>({
    resolver: zodResolver(validationSchemaNovoDocumento)
  });

  const mutationAdd = useMutationAdd();
  const { data: dataTipos } = useTipoDocumentos({ page: -1, filter: {} });

  const allTipos = dataTipos?.tipos.map((item) => {
    return { value: String(item.id), label: item.descricao }
  });

  const handleCreateDocument = (data: newFormDataNovoDocumento) => {
    mutationAdd.mutateAsync(data);
  }

  const handleSearchCooperado = async (cpf: string) => {
      const response: AxiosResponse<CooperadoResponse> = await apiUbots.get(`cooperado/${cpf}`);
      if(response.data.error) {
        setError('cpf', {type: 'cpf', message: response.data.message});
      }else{
        clearErrors('cpf');
        setValue('nome', response.data.nome);
      }
  }

  return(
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
           borderBottom="1px solid #ece7e7a9"
          >
            Criar novo Dossiê
          </DrawerHeader>

          <DrawerBody>
            {/* formulário de cadastro */}
            <Stack
              spacing={"4"}
            >
              <Text>Informe os dados para realizar o cadastro:</Text>
                <Input
                  type='text'
                  placeholder='Número do dossiê'
                  {...register('documento', {required: true})}
                  error={errors.documento}
                  label='Número do dossiê'
                />
                <Input
                  label="CPF/CNPJ Cooperado"
                  type='text'
                  placeholder='CPF/CNPJ'
                  {...register('cpf', {required: true})}
                  error={errors.cpf}
                  onBlur={(e: ChangeEvent<HTMLInputElement>) => handleSearchCooperado(e.target.value)}
                />
                <Input
                  label="Nome Cooperado"
                  type='text'
                  isReadOnly
                  placeholder='Nome cooperado'
                  {...register('nome', {required: true})}
                  error={errors.nome}
                />
                <Input
                  label="Valor Operação"
                  type='text'
                  placeholder='1500.00'
                  {...register('valor')}
                  error={errors.valor}
                />
                <Input
                  label="Vencimento Operação"
                  type='date'
                  placeholder='Vencimento'
                  {...register('vencimento')}
                  error={errors.vencimento}
                />

                <FormLabel mt={"2"} htmlFor={'tipo_documento_id'} >Tipo Documental</FormLabel>
                <Controller
                  name='tipo_documento_id'
                  control={control}
                  render={({ field: { onChange, ref, value, name } }) => (
                    <Select
                      // @ts-ignore
                      onChange={(e) => onChange(e?.value)}
                      options={allTipos}
                      placeholder="Selecione o tipo documental"
                      styles={optionsSelectStyles}
                      required
                    />
                  )}
                />
                { !!errors.tipo_documento_id && (
                <FormErrorMessage>
                  {errors.tipo_documento_id.message}
                </FormErrorMessage>
                )}
            </Stack>
            {/* formulário de cadastro */}
          </DrawerBody>

          <DrawerFooter>

          <Box
            display={"flex"}
            flex={"1"}
            justifyContent={"flex-end"}
          >
          <Button
              variant={'outline'}
              borderColor={"gray.200"}
              size={'lg'}
              width={"50%"}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
             variant={'solid'}
             borderColor={"gray.200"}
             size={'lg'}
             width={"50%"}
             ml={"2"}
             bgColor={"blue.700"}
             color={"white"}
             _hover={{
              bgColor: "blue.500"
             }}
             rightIcon={
              <FloppyDisk />
             }
             onClick={handleSubmit(handleCreateDocument)}
             isLoading={isSubmitting}
             loadingText={"Enviando..."}
            >
              Salvar
            </Button>
          </Box>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}