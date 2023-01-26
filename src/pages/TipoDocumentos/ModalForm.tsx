import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Button,
  SimpleGrid,
  Stack,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from '@chakra-ui/react'
import { FloppyDisk, Tag, Timer } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '../../components/Form/Input';
import {useMutation} from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { AxiosError } from 'axios';
import { queryClient } from '../../lib/reactQuery';


interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AxiosErrorResponse {
  response: {
    data: {
      msg: string;
    }
  }
}

// validação do formulario
const newFormSchema = zod.object({
  descricao: zod.string({required_error: "O campo descricao não pode ser vazio."}).max(191, { message: "O campo pode conter no máxiom 191 caracteres"}).min(1, { message: "O campo pode conter no mínimo 1 caracteres"}),
  temporalidade: zod.number({required_error: "O campo temporalidade não pode ser vazio.", invalid_type_error: "O campo temporalidade deve ser um número."}).min(1, { message: "O valor deve ser maior que 0"}),
});

type newFormData = zod.infer<typeof newFormSchema>;


export function ModalForm({isOpen, onClose}: ModalFormProps) {

  const {register, formState: {errors, isSubmitting}, handleSubmit, reset} = useForm<newFormData>({
    resolver: zodResolver(newFormSchema),
    defaultValues: { descricao: undefined, temporalidade: undefined },
  });

  const toast = useToast();
  const createTipoDocumento = useMutation(async (tipo: newFormData) => {
    const response = await api.post('tipo-documento', {
      ...tipo
  });

    return response.data;
  }, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['tipo-documentos']);
      toast({title: 'Tipo documental criado com sucesso!', description: `${response.msg}`, status: 'success', duration: 5000, isClosable: true, position: "top-right"});
    },
    onError: (err: AxiosErrorResponse) => {
      toast({title: 'Erro na criação!', description: `${err.response?.data.msg}`, status: 'warning', duration: 5000, isClosable: true, position: "top-right"});
    }
  });

  const handlleCreateNewTipo = async (data: newFormData) => {
    await createTipoDocumento.mutateAsync(data);
    reset();
    onClose();
  }
  return (
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
            Criar novo Tipo Documental
          </DrawerHeader>

          <DrawerBody>
            {/* formulário de cadastro */}
            <Stack
              spacing={"4"}
            >
              <Text>Informe os dados para realizar o cadastro:</Text>
              <InputGroup>
                <Input
                  type='text'
                  placeholder='Descrição do tipo documental'
                  {...register('descricao', {required: true})}
                  error={errors.descricao}
                />
              </InputGroup>
              
                
                <Input
                  type='number'
                  placeholder='Temporalidade em dias'
                  {...register('temporalidade',
                  {valueAsNumber:true})} 
                  error={errors.temporalidade}
                />
              
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
             onClick={handleSubmit(handlleCreateNewTipo)}
             isLoading={isSubmitting}
             loadingText={"Enviando..."}
            >
              Salvar
            </Button>
          </Box>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  );
}