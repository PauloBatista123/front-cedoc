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
  Stack,
  InputGroup,
  Text,
  useToast,
} from '@chakra-ui/react'
import { FloppyDisk } from 'phosphor-react';
import { Input } from '../../components/Form/Input';
import { TipoDocumento } from '../../utils/interfaces';
import {useForm} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as zod from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { api } from '../../lib/axios';
import { queryClient } from '../../lib/reactQuery';
import { useMutationEdit } from '../../hooks/TipoDocumental/useMutationEdit';

interface DialogEditTipoDocumentoProps{
  isOpen: boolean;
  onClose: () => void;
  tipoDocumento: TipoDocumento;
}

// validação do formulario
const updateFormSchema = zod.object({
  descricao: zod.string({required_error: "O campo descricao não pode ser vazio."}).max(191, { message: "O campo pode conter no máxiom 191 caracteres"}).min(1, { message: "O campo pode conter no mínimo 1 caracteres"}),
  temporalidade: zod.number({required_error: "O campo temporalidade não pode ser vazio.", invalid_type_error: "O campo temporalidade deve ser um número."}).min(1, { message: "O valor deve ser maior que 0"}),
});

export type updateFormData = zod.infer<typeof updateFormSchema>;

export function DialogEditTipoDocumento({isOpen, onClose, tipoDocumento}: DialogEditTipoDocumentoProps){
  // INICIALIZAÇÃO DO FORMDATA
  const {handleSubmit, register, formState: {errors, isSubmitting}, reset} = useForm<updateFormData>({
    values: {
      descricao: tipoDocumento.descricao,
      temporalidade: tipoDocumento.temporalidade, 
    }
  });

  // CHAMADA DE HOOK PARA EDITAR - HOOK
  const updateTipoDocumentoMutation = useMutationEdit(tipoDocumento);


  // FUNÇÃO DISPARADA NO CLIQUE DO BOTÃO SALVAR
  const handlleEditTipoDocumento = async (data: updateFormData) => {
      await updateTipoDocumentoMutation.mutateAsync(data);
      onClose();
      reset();
  }

  // VIEW
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
            Editar Tipo Documental
          </DrawerHeader>

          <DrawerBody>
            {/* formulário de cadastro */}
            <Stack
              spacing={"4"}
            >
              <Text>Informe os dados necessários:</Text>
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
             onClick={handleSubmit(handlleEditTipoDocumento)}
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